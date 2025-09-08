import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string;
    role: string;
  };
}

export const authMiddleware = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => void) => 
  async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token missing or invalid' });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = verify(token, JWT_SECRET) as { userId: string; role: string };
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export const superAdminMiddleware = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => void) => 
  authMiddleware(async (req, res) => {
    if (req.user?.role !== 'superadmin') {
      return res.status(403).json({ error: 'Forbidden: Access is restricted to super-admins' });
    }
    return handler(req, res);
});
