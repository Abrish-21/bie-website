import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

export type UserRole = 'superadmin' | 'admin' | 'content-admin' | 'user';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: IUser;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ error: 'Authorization header is missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded !== 'object' || !('userId' in decoded)) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findById((decoded as { userId: string }).userId).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    return null; // Return null to signal success
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest) => {
    if (!req.user) {
      return 'Authentication required';
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
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