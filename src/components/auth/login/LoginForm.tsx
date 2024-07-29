'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '../../common/InputField'
import Button from '../../common/Button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'


export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      router.push('/')
          return {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: userCredential.user.email,
          };

    } catch (error) {
      setError('Failed to log in. Please check your credentials.')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <InputField
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button type="submit">Sign in</Button>
    </form>
  )
}