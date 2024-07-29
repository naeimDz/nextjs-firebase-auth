'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '../../common/InputField'
import Button from '../../common/Button'
import { useAuth } from '@/context/AuthContext'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { signIn, signInWithGoogle, signInWithFacebook } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await signIn(email, password);
      router.push('/')          

    } catch (error) {
      setError('Failed to log in. Please check your credentials.')
      console.error(error)
    }
  }

  return (
    <>
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
    <div className="mt-4">
        <button
          onClick={signInWithGoogle}
          className="mb-2 p-2 w-full bg-red-500 text-white rounded"
        >
          Sign in with Google
        </button>
        <button
          onClick={signInWithFacebook}
          className="p-2 w-full bg-blue-800 text-white rounded"
        >
          Sign in with Facebook
        </button>
      </div>
  </>
  )
}