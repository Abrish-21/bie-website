import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import { PostService } from '../../services/postService';
import { UserService } from '../../services/userService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Get basic stats
    const [posts, users] = await Promise.all([
      PostService.getPosts({ limit: 1 }),
      UserService.getAllUsers()
    ]);

    res.status(200).json({
      message: 'Backend is working!',
      stats: {
        totalPosts: posts.total,
        totalUsers: users.length,
        databaseConnected: true
      },
      samplePost: posts.posts[0] || null,
      sampleUser: users[0] || null
    });
  } catch (error: any) {
    console.error('Test API error:', error);
    res.status(500).json({ 
      error: 'Backend error',
      message: error.message,
      databaseConnected: false
    });
  }
}

