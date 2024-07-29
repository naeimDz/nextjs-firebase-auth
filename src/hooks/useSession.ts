// app/hooks/useSession.ts
import { useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { getIdToken, onIdTokenChanged } from 'firebase/auth';

const useSession = () => {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user, true); // Force refresh token
        sessionStorage.setItem('token', token);
      } else {
        sessionStorage.removeItem('token');
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useSession;
