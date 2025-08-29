import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bie-website");
    
    const posts = await db.collection("posts").find({}, { projection: { tags: 1 } }).toArray();
    const allTags = posts.flatMap(post => post.tags || []);
    const uniqueTags = [...new Set(allTags)];
    
    res.status(200).json({ tags: uniqueTags });
  } catch (error: any) {
    console.error('Tags API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

