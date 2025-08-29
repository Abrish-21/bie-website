// src/pages/api/upload-image.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File as FormidableFile } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path'; // Needed for path.resolve
import os from 'os';   // Needed for os.tmpdir

// Cloudinary configuration (ensure these are set in your .env.local or Vercel environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parsing by Next.js as formidable will handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

// Promisify fs.unlink for cleaner async/await usage
const unlinkAsync = promisify(fs.unlink);

export default async function uploadImageHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No authentication token provided.' });
  }

  // Determine the temporary upload directory reliably
  // os.tmpdir() should resolve to '/tmp' on Vercel, which is the only writeable location.
  const baseTempDir = os.tmpdir();
  // ⭐ FIX: Ensure uploadDir is an absolute path to /tmp explicitly using path.resolve ⭐
  // This explicitly resolves any potential relative path issues, though os.tmpdir() should be absolute.
  const formidableUploadDir = path.resolve(baseTempDir); 

  // --- Ultra-verbose path debugging ---
  console.log(`[DEBUG_PATH] 1. os.tmpdir() resolved: "${baseTempDir}"`);
  console.log(`[DEBUG_PATH] 2. formidableUploadDir (path.resolve(os.tmpdir())): "${formidableUploadDir}"`);
  console.log(`[DEBUG_PATH] 3. Current process.cwd(): "${process.cwd()}"`);
  // --- End ultra-verbose path debugging ---

  // Ensure the temporary directory exists.
  if (!fs.existsSync(formidableUploadDir)) {
    fs.mkdirSync(formidableUploadDir, { recursive: true });
    console.log(`[DEBUG] Created temporary upload directory: ${formidableUploadDir}`);
  }

  const form = new IncomingForm({
    multiples: false, // Expecting a single file upload
    keepExtensions: true, // Keep original file extension
    uploadDir: formidableUploadDir, // ⭐ Use the explicitly resolved temporary directory ⭐
    maxFileSize: 5 * 1024 * 1024, // 5MB max file size
  });

  // ⭐ DEBUG: Log the effective uploadDir from the formidable instance itself (via type assertion) ⭐
  console.log(`[DEBUG_FORM] Formidable instance configured uploadDir (runtime value): "${(form as any).uploadDir}"`);

  let imageFile: FormidableFile | undefined; 

  try {
    const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('[DEBUG_PARSE_ERROR] Formidable parse error:', err);
          return reject(err);
        }
        resolve({ fields, files });
      });
    });

    imageFile = files.image as FormidableFile | undefined; 

    if (!imageFile) {
      console.error('[DEBUG_FILE_MISSING] No image file found in formidable files object after parse.');
      return res.status(400).json({ error: 'No image file provided.' });
    }

    console.log(`[DEBUG_FILE_INFO] Image file received: name="${imageFile.originalFilename}", type="${imageFile.mimetype}", size=${imageFile.size}`);
    console.log(`[DEBUG_FILE_PATH] Temporary filepath from formidable: "${imageFile.filepath}"`);

    // ⭐ CRITICAL CHECK: Does the file exist at this path immediately after formidable reports it? ⭐
    if (!fs.existsSync(imageFile.filepath)) {
      console.error(`[ERROR_ENOENT] File DOES NOT EXIST at formidable path: "${imageFile.filepath}" BEFORE CLOUDINARY UPLOAD.`);
      return res.status(500).json({ error: 'Temporary file missing on server before Cloudinary upload.' });
    }
    console.log(`[DEBUG_FILE_EXISTS] File EXISTS at formidable path: "${imageFile.filepath}"`);

    // Upload to Cloudinary
    const cloudinaryUploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
      folder: 'bie-website-posts',
      resource_type: 'image',
    });

    // Clean up the temporary file on success
    await unlinkAsync(imageFile.filepath);
    console.log(`[DEBUG_CLEANUP] Cleaned up temp file on success: "${imageFile.filepath}"`);

    // Return the image URL from Cloudinary
    return res.status(200).json({ imageUrl: cloudinaryUploadResult.secure_url });

  } catch (error: any) {
    console.error('[DEBUG_CATCH_ERROR] Image upload failed in catch block:', error);

    // Attempt to clean up temporary file if its path is known and it still exists
    if (imageFile?.filepath && fs.existsSync(imageFile.filepath)) {
      try {
        await unlinkAsync(imageFile.filepath);
        console.log(`[DEBUG_CLEANUP_ERROR] Cleaned up temp file in error handler: "${imageFile.filepath}"`);
      } catch (cleanupError) {
        console.error(`[ERROR_CLEANUP] Error cleaning up temp file "${imageFile.filepath}" in error handler:`, cleanupError);
      }
    }

    if (error.code === 1009) { // Formidable file size limit error
        return res.status(400).json({ error: 'File size exceeds 5MB limit.' });
    } else if (error.http_code && error.message) { // Cloudinary API error format
        return res.status(error.http_code).json({ error: `Cloudinary upload failed: ${error.message}` });
    } else if (error.message?.includes("Missing required parameter - file")) { // Catch specific Cloudinary SDK error
        return res.status(400).json({ error: 'Cloudinary error: Image file not correctly provided for upload.' });
    }
    // Generic server error
    return res.status(500).json({ error: error.message || 'Failed to upload image to Cloudinary.' });
  }
}
