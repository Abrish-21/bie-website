import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bie-website");
    const categories = await db.collection("posts").distinct("category");
    res.status(200).json({ categories });
  } catch (error: any) {
    console.error('Categories API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

