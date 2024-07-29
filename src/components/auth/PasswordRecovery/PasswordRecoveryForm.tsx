'use client'

import { useState } from 'react'
import InputField from '../../common/InputField'
import Button from '../../common/Button'


export default function PasswordRecoveryForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/password-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        const data = await response.json()
        setError(data.message || 'Password recovery request failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
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