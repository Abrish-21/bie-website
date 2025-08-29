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
        return await handleGetPost(req, res, db);
      case 'PUT':
        return await handleUpdatePost(req, res, db);
      case 'DELETE':
        return await handleDeletePost(req, res, db);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Post API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGetPost(req: NextApiRequest, res: NextApiResponse, db: any) {
  try {
    const { id } = req.query as { id: string };
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ post });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}

async function handleUpdatePost(req: NextApiRequest, res: NextApiResponse, db: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { id } = req.query as { id: string };
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const updateData = req.body || {};
    updateData.updatedAt = new Date();

    const existing = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (existing.authorId?.toString && existing.authorId.toString() !== decoded.userId && decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'You can only update your own posts' });
    }

    await db.collection("posts").updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

    res.status(200).json({
      message: 'Post updated successfully',
      post
    });
  } catch (error: any) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
}

async function handleDeletePost(req: NextApiRequest, res: NextApiResponse, db: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { id } = req.query as { id: string };
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const existing = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (existing.authorId?.toString && existing.authorId.toString() !== decoded.userId && decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({
      message: 'Post deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
}
