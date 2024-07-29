// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid email or password' });
  }
};

export default login;
