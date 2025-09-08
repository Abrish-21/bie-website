import { NextApiRequest, NextApiResponse } from 'next';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

import clientPromise from '../../../lib/mongodb';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const client = await clientPromise;
    const db = client.db('bie-website');
    const user = await db.collection('users').findOne({ email: String(email).toLowerCase() });
    if (user && user.status !== 'active') {
      return res.status(403).json({ error: 'Account not active. Please wait for super-admin approval.' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Type guard to ensure user.password is a string before comparison
    if (typeof user.password !== 'string') {
        console.error('User password field is not a string:', user);
        return res.status(500).json({ error: 'Internal server error: Invalid user data' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Ensure _id, role, and name exist and are in correct format for JWT
    if (!user._id || typeof user.role !== 'string' || typeof user.name !== 'string') {
        console.error('User _id, role, or name is missing/invalid:', user);
        return res.status(500).json({ error: 'Internal server error: User data incomplete' });
    }

    const token = await new SignJWT({ 
        userId: user._id.toString(), 
        role: user.role,
        name: user.name // Add user's name to the token payload
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // Set token in an HTTP-only cookie
    res.setHeader('Set-Cookie', `authToken=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`);

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
  }
  catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}