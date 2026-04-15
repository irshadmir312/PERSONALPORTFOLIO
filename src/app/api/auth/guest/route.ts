import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/auth/guest — create guest user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name } = body

    const guestName = name || `Explorer_${Math.random().toString(36).substring(2, 8)}`

    const guest = await db.user.create({
      data: {
        name: guestName,
        isGuest: true,
        mode: 'explorer',
      },
    })

    return NextResponse.json({
      success: true,
      user: {
        id: guest.id,
        name: guest.name,
        email: guest.email,
        isGuest: guest.isGuest,
        mode: guest.mode,
        xp: guest.xp,
        level: guest.level,
        badges: JSON.parse(guest.badges),
        createdAt: guest.createdAt,
      },
    })
  } catch (error) {
    console.error('Guest auth error:', error)
    return NextResponse.json(
      { error: 'Failed to create guest user' },
      { status: 500 }
    )
  }
}
