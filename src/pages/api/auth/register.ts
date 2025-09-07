// src/pages/api/auth/register.ts

import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb'; // Import clientPromise for native driver access
// Removed import for connectDB and UserService for direct MongoDB driver usage

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
  const { username, name, email, password, role } = req.body;

    if (!username || !name || !email || !password || !role) {
      return res.status(400).json({ error: 'Username, name, email, password and role are required' });
    }



    // Get client and database using clientPromise
    const client = await clientPromise;
    const db = client.db('bie-website'); // Specify your database name

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ $or: [
      { email: String(email).toLowerCase() },
      { username: String(username) }
    ] });
    if (existingUser) {
      // Return a 409 Conflict status if user already exists
      return res.status(409).json({ error: 'User with this email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 salt rounds for bcrypt

    // Insert new user into the 'users' collection
    const newUser = {
      username,
      name,
      email: String(email).toLowerCase(),
      password: hashedPassword,
      role: 'admin',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);

    // Return the created user without the password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      message: 'User created successfully',
      user: { _id: result.insertedId, ...userWithoutPassword } // Include the generated _id
    });
  } catch (error) { // Type is inferred as 'unknown'
    console.error('Registration error:', error);
    if (error instanceof Error && error.message === 'User with this email already exists') {
      return res.status(409).json({ error: error.message }); // Use 409 for conflict
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}