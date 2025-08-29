import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.ts'; // <-- Corrected import path

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: IUser;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    return null; // Return null to signal success
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireRole = (allowedRoles: ('admin' | 'superadmin')[]) => {
  return (req: AuthenticatedRequest) => {
    if (!req.user) {
      return 'Authentication required';
    }

    if (!allowedRoles.includes(req.user.role)) {
      return 'Insufficient permissions';
    }

    return null; // Return null to signal success
  };
};

export const requireSuperAdmin = (req: AuthenticatedRequest) => {
  return requireRole(['superadmin'])(req);
};

export const requireAdmin = (req: AuthenticatedRequest) => {
  return requireRole(['admin', 'superadmin'])(req);
};