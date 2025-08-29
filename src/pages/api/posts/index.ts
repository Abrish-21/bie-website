import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("bie-website");
    
    switch (req.method) {
      case 'GET':
        return await handleGetPosts(req, res, db);
      case 'POST':
        return await handleCreatePost(req, res, db);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Posts API error:', error);
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
}

async function handleGetPosts(req: NextApiRequest, res: NextApiResponse, db: any) {
  try {
    const { tag, type, category } = req.query;
    const limitNum = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const skipNum = req.query.skip ? parseInt(req.query.skip as string) : 0;

    let query: any = {};
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (type) {
      query.type = type;
    }
    
    if (category) {
      query.category = category;
    }

    const [posts, total] = await Promise.all([
      db.collection("posts")
        .find(query)
        .sort({ publishDate: -1 })
        .limit(limitNum)
        .skip(skipNum)
        .toArray(),
      db.collection("posts").countDocuments(query)
    ]);

    res.status(200).json({
      posts,
      total,
      hasMore: skipNum + posts.length < total,
    });
  } catch (error: any) {
    console.error('Failed to fetch posts', error);
    res.status(500).json({ error: error?.message || 'Failed to fetch posts' });
  }
}

async function handleCreatePost(req: NextApiRequest, res: NextApiResponse, db: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      type,
      isDraft,
      author,
      authorId,
    } = req.body;

    // Only require essential fields
    if (!title || !content || !category || !type) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide: title, content, category, and type' 
      });
    }

    const post = {
      title,
      excerpt: excerpt || '',
      content,
      category,
      tags: tags || [],
      type,
      isDraft: isDraft || false,
      author: author || (decoded.role === 'superadmin' ? 'Super Admin' : 'Content Admin'),
      authorId: authorId || new ObjectId(decoded.userId),
      publishDate: new Date(),
      views: 0,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("posts").insertOne(post);
    const createdPost = { ...post, _id: result.insertedId };

    res.status(201).json({
      message: 'Post created successfully',
      post: createdPost,
    });
  } catch (error: any) {
    console.error('Create post error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Failed to create post' });
  }
}