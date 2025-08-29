import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock users data
const mockUsers = [
  {
    _id: '1',
    name: 'Super Admin',
    email: 'admin@bie-website.com',
    role: 'superadmin',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    _id: '2',
    name: 'Content Admin',
    email: 'content@bie-website.com',
    role: 'admin',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02')
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await handleGetUsers(req, res);
      case 'DELETE':
        return await handleDeleteUser(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Users API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGetUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Authentication check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
      if (decoded.role !== 'superadmin') {
        return res.status(403).json({ error: 'Superadmin access required' });
      }

      res.status(200).json({
        users: mockUsers,
        total: mockUsers.length
      });
    } catch (jwtError: any) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function handleDeleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Authentication check
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
      if (decoded.role !== 'superadmin') {
        return res.status(403).json({ error: 'Superadmin access required' });
      }

      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Check if user exists and is not the current user
      const userIndex = mockUsers.findIndex(user => user._id === id);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (id === decoded.userId) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
      }

      // Remove user from mock data
      mockUsers.splice(userIndex, 1);

      res.status(200).json({
        message: 'User deleted successfully'
      });
    } catch (jwtError: any) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

