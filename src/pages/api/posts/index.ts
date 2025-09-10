import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User'; // <-- This must be imported BEFORE the Post model
import Post from '../../../models/Post';
import { jwtVerify, JWTPayload } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
);

// Auth middleware for protected routes
interface AuthRequest extends NextApiRequest {
  user?: JWTPayload & { name?: string; userId?: string };
}

type AuthHandler = (req: AuthRequest, res: NextApiResponse) => Promise<void>;

const auth = (handler: AuthHandler) => async (req: AuthRequest, res: NextApiResponse) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized: No authentication token provided.' });
  }

  try {
    const { payload } = await jwtVerify(authToken, JWT_SECRET, {
      algorithms: ['HS256']
    });
    req.user = payload; // Attach user info to the request
    return handler(req, res);
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database first
  await dbConnect();

  switch (req.method) {
    case 'GET':
      // Public GET route - no auth middleware needed
      return handleGetPosts(req, res);
      
    case 'POST':
      // Auth middleware for POST route
      return auth(async (req, res) => {
        try {
          if (!req.user) {
            return res.status(401).json({ success: false, error: 'Unauthorized: User information missing.' });
          }

          const postData = {
            ...req.body,
            // Use the authorId from the JWT token for security and data integrity
            authorId: req.user.userId,
          };
          
          const post = await Post.create(postData);
          
          res.status(201).json({ success: true, data: post });
        } catch (error) {
          if (error instanceof Error) {
            res.status(400).json({ success: false, error: error.message });
          } else {
            res.status(400).json({ success: false, error: 'An unknown error occurred.' });
          }
        }
      })(req, res);

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tag, type, category, limit = '10', skip = '0' } = req.query;
    const limitNum = parseInt(limit as string);
    const skipNum = parseInt(skip as string);

    let query: any = {};
    if (tag) query.tags = { $in: [tag] };
    if (type) query.type = type;
    if (category) query.category = category;

    // Use a try/catch block inside Promise.all to isolate and log specific errors
    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort({ publishDate: -1 })
        .limit(limitNum)
        .skip(skipNum)
        .populate('authorId', 'name')
        .lean(),
      Post.countDocuments(query)
    ]);

    res.status(200).json({
      posts: posts.map(p => ({
        ...p,
        // Gracefully handle cases where authorId is not populated
        author: (p.authorId as any)?.name || 'Unknown'
      })),
      total,
      hasMore: skipNum + posts.length < total,
    });
  } catch (error: any) {
    console.error('Failed to fetch posts', error);
    // Provide a more detailed error message in the response for better debugging
    res.status(500).json({
      error: 'Failed to fetch posts',
      details: error.message || 'An unknown error occurred.'
    });
  }
}

export default handler;
