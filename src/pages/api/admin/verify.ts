import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string;
    role: string;
  };
}

const authMiddleware = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => void) => 
  async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { authToken } = req.cookies;

    if (!authToken) {
      return res.status(401).json({ error: 'Authorization token missing or invalid' });
    }

    const token = authToken;

    try {
      const decoded = verify(token, JWT_SECRET) as { userId: string; role: string };
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

const superAdminMiddleware = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => void) => 
  authMiddleware(async (req, res) => {
    if (req.user?.role !== 'superadmin') {
      return res.status(403).json({ error: 'Forbidden: Access is restricted to super-admins' });
    }
    return handler(req, res);
});

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const pendingUsers = await User.find({ status: 'pending' }).select('-password');
      return res.status(200).json({ users: pendingUsers });
    } catch (error) {
      console.error('Error fetching pending users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    const { userId, status } = req.body;

    if (!userId || !status || status !== 'active') {
      return res.status(400).json({ error: 'User ID and active status are required' });
    }

    try {
      const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ message: 'User approved successfully', user });
    } catch (error) {
      console.error('Error approving user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default superAdminMiddleware(handler);
