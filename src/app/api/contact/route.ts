import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = await req.json()

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Store contact message in database using Prisma
    const { db } = await import('@/lib/db')

    await db.contactRequest.create({
      data: {
        name,
        email: `contact-${Date.now()}@portfolio.local`,
        phone,
        message,
      },
    })

    return NextResponse.json(
      { success: true, message: 'Message received! I will get back to you soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
