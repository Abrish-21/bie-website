import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear the authToken cookie by setting its Max-Age to 0
  res.setHeader('Set-Cookie', 'authToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');
  
  res.status(200).json({ message: 'Logout successful' });
}
