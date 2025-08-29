import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bie-website");
    const { slug } = req.query as { slug: string };
    
    const post = await db.collection("posts").findOne({ slug });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Increment view count
    await db.collection("posts").updateOne(
      { slug },
      { $inc: { views: 1 } }
    );
    
    res.status(200).json({ post });
  } catch (error: any) {
    console.error('Post by slug API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

