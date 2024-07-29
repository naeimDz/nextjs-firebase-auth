// pages/api/protected-route.ts
import withAuth from '@/middleware/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This is a protected route' });
};

export default withAuth(protectedRoute);
