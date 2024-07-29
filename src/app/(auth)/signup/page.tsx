import SignupForm from "@/components/singup/SignupForm";
import Link from "next/link";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create your account',
}

export const revalidate = 3600 // Revalidate every hour


export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <SignupForm />
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}