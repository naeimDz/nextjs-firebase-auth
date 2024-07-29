'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { applyActionCode } from 'firebase/auth'
import { auth } from '@/firebaseConfig'


export default function EmailConfirmation({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        await applyActionCode(auth, token)
        setStatus('success')
        setMessage('Your email has been successfully confirmed!')
      } catch (error) {
        setStatus('error')
        setMessage('Email confirmation failed. The link may be invalid or expired.')
        console.error(error)
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