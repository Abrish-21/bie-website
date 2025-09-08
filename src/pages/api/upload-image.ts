import { NextApiRequest, NextApiResponse } from 'next';
import multer, { MulterError } from 'multer';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (ensure credentials are in .env.local and Vercel)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to store files in /tmp
const upload = multer({
  storage: multer.diskStorage({
    destination: '/tmp', // Vercel's writable directory
    filename: (
      req: any, // CRITICAL FIX: Use 'any' here to resolve the type incompatibility
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
    ) => {
      cb(null, file.originalname); // Use original filename
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware to handle multer parsing
const uploadMiddleware = upload.single('image'); // Matches frontend's formData.append('image', file)

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadImageHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

    // Authentication check
  const { authToken } = req.cookies;
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized: No authentication token provided.' });
  }

  // Wrap multer middleware in a Promise with type assertion
  await new Promise<void>((resolve, reject) => {
    // Apply `as any` to both req and res to resolve the type errors
    // The callback itself also needs to be cast to `any` to satisfy the middleware's type
    uploadMiddleware(req as any, res as any, ((err: MulterError | Error | undefined) => {
      if (err instanceof MulterError) {
        console.error('[DEBUG_MULTER_ERROR] Multer error:', err);
        return reject(new Error(err.message));
      } else if (err) {
        console.error('[DEBUG_UPLOAD_ERROR] Upload error:', err);
        return reject(new Error('Failed to process file upload'));
      }
      resolve();
    }) as any);
  });

  try {
    // Check if file was uploaded
    const file = (req as any).file as Express.Multer.File; // Multer adds file to req
    if (!file) {
      console.error('[DEBUG_FILE_MISSING] No valid image file provided.');
      return res.status(400).json({ error: 'No image file provided.' });
    }

    // Log file details for debugging
    console.log('[DEBUG_FILE_INFO] Image file received:', {
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
    });

    // File is already written to /tmp by multer
    const tempPath = file.path; // Multer provides the path
    
    // Verify file exists
    const fs = require('fs');
    if (!fs.existsSync(tempPath)) {
      console.error(`[ERROR_ENOENT] File DOES NOT EXIST at path: "${tempPath}"`);
      return res.status(500).json({ error: 'Temporary file missing on server before Cloudinary upload.' });
    }
    console.log(`[DEBUG_FILE_EXISTS] File EXISTS at path: "${tempPath}"`);

    // Upload to Cloudinary
    const cloudinaryUploadResult = await cloudinary.uploader.upload(tempPath, {
      folder: 'bie-website-posts', // Your folder name
      resource_type: 'image',
    });

    // Clean up temp file
    await unlink(tempPath).catch((err: Error) => {
      console.error(`[ERROR_CLEANUP] Failed to delete temp file "${tempPath}":`, err.message);
    });
    console.log(`[DEBUG_CLEANUP] Cleaned up temp file: "${tempPath}"`);

    // Return the image URL (matches your frontend expectation)
    return res.status(200).json({ imageUrl: cloudinaryUploadResult.secure_url });
  } catch (error: any) {
    console.error('[DEBUG_CATCH_ERROR] Image upload failed:', error);

    // Handle specific errors
    if (error.message?.includes('Missing required parameter - file')) {
      return res.status(400).json({ error: 'Cloudinary error: Image file not correctly provided for upload.' });
    } else if (error.http_code) {
      return res.status(error.http_code).json({ error: `Cloudinary upload failed: ${error.message}` });
    } else if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds 5MB limit.' });
    }

    return res.status(500).json({ error: error.message || 'Failed to upload image to Cloudinary.' });
  }
}
