// pages/api/reset-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export default resetPassword;
