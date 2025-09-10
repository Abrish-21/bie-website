import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
// FIX: Correcting the import path.
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Establish database connection
    await dbConnect();

    // Destructure user data from the request body. 'role' is removed.
    // ADDED: profilePictureUrl to the destructuring
    const { username, name, email, password, profilePictureUrl } = req.body;

    // Validate that all required fields are present
    if (!username || !name || !email || !password) {
      return res.status(400).json({ error: 'Username, name, email, and password are required.' });
    }

    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email or username already exists' });
    }

    // Create a new user instance using the Mongoose model
    // Password will be automatically hashed by the User model's pre-save hook
    const user = new User({
      username,
      name,
      email: email.toLowerCase(),
      password: password, // Raw password - will be hashed by pre-save hook
      role: 'admin', // Role is hardcoded to 'admin' for public registration
      status: 'pending',     // New users must be verified by a super-admin
      profilePictureUrl: profilePictureUrl || null // ADDED: Save the profile picture URL
    });

    // Save the new user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'Registration successful. Your account is pending approval.' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An internal server error occurred during registration.' });
  }
}
