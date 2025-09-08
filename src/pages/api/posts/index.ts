import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import User from '../../../models/User';
import { authMiddleware, AuthenticatedRequest } from '../../../lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return handleGetPosts(req, res);
    case 'POST':
      return authMiddleware(handleCreatePost)(req, res);
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

async function handleCreatePost(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { title, content, imageUrl, category, type, readTime, tags, isDraft } = req.body;

    if (!title || !content || !imageUrl || !category || !type || !readTime) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, content, imageUrl, category, type, and readTime are required.' 
      });
    }

    const author = await User.findById(req.user.userId);
    if (!author) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    const post = new Post({
      ...req.body,
      authorId: author._id,
      author: author.name,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    });

    await post.save();

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error: any) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
}

export default handler;
