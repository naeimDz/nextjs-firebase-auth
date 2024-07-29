// middleware/auth.ts
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { auth } from '../firebaseConfig';

const withAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        sessionStorage.getItem('token');
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

export default withAuth;
