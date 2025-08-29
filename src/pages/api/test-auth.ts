import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).json({
        message: 'Token is valid',
        decoded,
        secret: JWT_SECRET.substring(0, 10) + '...'
      });
    } catch (jwtError: any) {
      res.status(401).json({
        error: 'Invalid token',
        jwtError: jwtError.message,
        secret: JWT_SECRET.substring(0, 10) + '...'
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

