'use client'

import { useState } from 'react'
import InputField from '../../common/InputField'
import Button from '../../common/Button'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebaseConfig'


export default function PasswordRecoveryForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (error) {
      setError('Failed to send password reset email. Please try again.')
      console.error(error)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <p className="text-green-600 font-medium">
          If an account exists for {email}, you will receive password reset instructions.
        </p>
      </div>
    )
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button type="submit">Send recovery email</Button>
    </form>
  )
}