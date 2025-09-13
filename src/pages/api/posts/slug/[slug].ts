import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';
import User from '../../../../models/User'; // Ensure User model is imported

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect(); // Ensure DB connection
    const { slug } = req.query as { slug: string };

    // Use Mongoose to find by slug and populate the authorId field
    const post = await Post.findOne({ slug }).populate({
      path: 'authorId', // Corrected from 'author'
      model: User,
      select: 'name profilePictureUrl', // Specify the fields you need
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment view count without affecting the returned object
    await Post.updateOne({ _id: post._id }, { $inc: { views: 1 } });

    res.status(200).json({ post });
  } catch (error: any) {
    console.error('Post by slug API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

