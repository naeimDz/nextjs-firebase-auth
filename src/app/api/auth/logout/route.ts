// pages/api/logout.ts
import { auth } from '@/firebaseConfig';
import type { NextApiRequest, NextApiResponse } from 'next';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth.signOut();
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging out' });
  }
};

export default logout;
