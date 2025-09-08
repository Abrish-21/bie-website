import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth middleware for protected routes
interface AuthRequest extends NextApiRequest {
  user?: JwtPayload;
}

type AuthHandler = (req: AuthRequest, res: NextApiResponse) => Promise<void>;

const auth = (handler: AuthHandler) => async (req: AuthRequest, res: NextApiResponse) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized: No authentication token provided.' });
  }

  try {
    const decoded = verify(authToken, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Attach user info to the request
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return handleGetPosts(req, res);
    case 'POST':
      // We need to wrap the post logic in the auth middleware
      return auth(async (req, res) => {
        try {
          if (!req.user) {
            return res.status(401).json({ success: false, error: 'Unauthorized: User information missing.' });
          }
          const post = await Post.create({ ...req.body, author: req.user.userId });
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
      posts: posts.map(p => ({ ...p, author: (p.authorId as any)?.name || 'Unknown' })),
      total,
      hasMore: skipNum + posts.length < total,
    });
  } catch (error: any) {
    console.error('Failed to fetch posts', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

export default handler;
