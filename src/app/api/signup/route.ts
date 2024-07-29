import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  // Here you would typically validate the input and create a new user in your database
  // This is a mock implementation for demonstration purposes
  if (name && email && password) {
    // In a real application, you would hash the password before storing it
    return NextResponse.json({ message: 'Signup successful' }, { status: 201 })
  } else {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 })
  }
}