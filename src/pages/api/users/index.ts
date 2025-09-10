import { NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { superAdminMiddleware, AuthenticatedRequest } from '../../../lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    switch (req.method) {
      case 'GET':
        return handleGetUsers(req, res);
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in superAdminMiddleware:', error);
    res.status(500).json({ error: 'Failed to authenticate superadmin.' });
  }
}

async function handleGetUsers(req: AuthenticatedRequest, res: NextApiResponse) {
  try {
    const users = await User.find({}).select('-password').lean();
    res.status(200).json({
      users,
      total: users.length,
    });
  } catch (error: any) {
    console.error('Failed to fetch users', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export default superAdminMiddleware(handler);
