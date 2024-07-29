// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export default register;
