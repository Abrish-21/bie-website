import { NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { superAdminMiddleware, AuthenticatedRequest } from '../../../lib/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGetUser(req, res, id);
    case 'PUT':
      return handleUpdateUser(req, res, id);
    case 'DELETE':
      return handleDeleteUser(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetUser(req: AuthenticatedRequest, res: NextApiResponse, id: string) {
  try {
    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error: any) {
    console.error('Failed to fetch user', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

async function handleUpdateUser(req: AuthenticatedRequest, res: NextApiResponse, id: string) {
  try {
    const { role } = req.body;
    if (role && req.user?.role !== 'superadmin') {
      return res.status(403).json({ error: 'Only super-admins can change user roles.' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

async function handleDeleteUser(req: AuthenticatedRequest, res: NextApiResponse, id: string) {
  try {
    if (id === req.user!.userId) {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

export default superAdminMiddleware(handler);

