import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function authenticateSuperAdmin(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access token required' });
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    if (decoded.role !== 'superadmin') {
      res.status(403).json({ error: 'Super-admin access required' });
      return null;
    }
    return decoded;
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const decoded = await authenticateSuperAdmin(req, res);
  if (!decoded) return;

  const client = await clientPromise;
  const db = client.db('bie-website');

  if (req.method === 'GET') {
    // Get all pending users
    const pendingUsers = await db.collection('users').find({ status: 'pending' }).toArray();
    res.status(200).json({ users: pendingUsers });
    return;
  }

  if (req.method === 'PUT') {
    // Update user status
    const { userId, status } = req.body;
    if (!userId || !status) {
      res.status(400).json({ error: 'userId and status required' });
      return;
    }
    const result = await db.collection('users').updateOne(
      { _id: typeof userId === 'string' ? new (require('mongodb').ObjectId)(userId) : userId },
      { $set: { status } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User status updated' });
    } else {
      res.status(404).json({ error: 'User not found or status unchanged' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
