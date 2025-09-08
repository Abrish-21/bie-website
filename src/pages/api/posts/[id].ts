import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import { authMiddleware, AuthenticatedRequest } from '../../../lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGetPost(req, res, id);
    case 'PUT':
      return authMiddleware(handleUpdatePost)(req, res);
    case 'DELETE':
      return authMiddleware(handleDeletePost)(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetPost(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    const post = await Post.findById(id).lean();
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ post });
  } catch (error: any) {
    console.error('Failed to fetch post', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}

async function handleUpdatePost(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId.toString() !== req.user!.userId && req.user!.role !== 'superadmin') {
      return res.status(403).json({ error: 'You can only update your own posts' });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (error: any) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
}

async function handleDeletePost(req: AuthenticatedRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId.toString() !== req.user!.userId && req.user!.role !== 'superadmin') {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Post deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
}

export default handler;
