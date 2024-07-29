'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function EmailConfirmation({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch('/api/confirm-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        if (response.ok) {
          setStatus('success')
          setMessage('Your email has been successfully confirmed!')
        } else {
          setStatus('error')
          const data = await response.json()
          setMessage(data.message || 'Email confirmation failed')
        }
      } catch (err) {
        setStatus('error')
        setMessage('An error occurred. Please try again.')
      }
    }

    confirmEmail()
  }, [token])

  return (
    <div className="text-center">
      {status === 'loading' && (
        <p className="text-gray-600">Confirming your email...</p>
      )}
      {status === 'success' && (
        <>
          <p className="text-green-600 font-medium mb-4">{message}</p>
          <Link 
            href="/login" 
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Proceed to login
          </Link>
        </>
      )}
      {status === 'error' && (
        <>
          <p className="text-red-600 font-medium mb-4">{message}</p>
          <Link 
            href="/signup" 
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Return to signup
          </Link>
        </>
      )}
    </div>
  )
}