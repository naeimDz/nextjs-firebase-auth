// pages/api/verify-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';

const confirmEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = auth.currentUser;

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    await sendEmailVerification(user);
    res.status(200).json({ message: 'Email verification sent' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export default confirmEmail;
