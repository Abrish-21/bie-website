import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow a GET request to trigger this.
  // We're doing this via a GET for simplicity, but a POST is generally better.
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Connect to the database
    await dbConnect();

    // 2. Check if a super admin already exists to prevent duplicates
    const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      return res.status(409).json({ success: false, message: 'Super admin user already exists. No new user was created.' });
    }

    // 3. Define the new super admin's details
    const superAdminData = {
      username: 'superadmin',
      name: 'Site Administrator',
      email: 'admin@gmail.com', // Change this to a real email if needed
      password: 'admin123', // <<-- CHANGE THIS PASSWORD IMMEDIATELY AFTER LOGIN -->>
      role: 'superadmin',
      status: 'active'
    };

    // 4. Create the new user
    const newSuperAdmin = await User.create(superAdminData);

    // 5. Send a success response
    res.status(201).json({ 
      success: true, 
      message: 'Super admin user created successfully. Please change the password immediately!',
      data: {
        username: newSuperAdmin.username,
        email: newSuperAdmin.email,
        role: newSuperAdmin.role,
        status: newSuperAdmin.status
      }
    });

  } catch (error: any) {
    console.error('Failed to create super admin:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create super admin user.', 
      details: error.message 
    });
  }
}
