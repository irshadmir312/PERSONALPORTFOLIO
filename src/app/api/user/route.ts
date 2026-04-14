import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/user?id=xxx — get user profile with stats
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        mode: true,
        xp: true,
        level: true,
        badges: true,
        isGuest: true,
        createdAt: true,
        _count: {
          select: {
            chatMessages: true,
            interactions: true,
            bookmarks: true,
            quizAttempts: true,
            contactRequests: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate additional stats
    const latestQuiz = await db.quizAttempt.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { score: true, total: true },
    })

    const visitedSections = await db.userInteraction.groupBy({
      by: ['section'],
      where: { userId, action: 'view' },
    })

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        badges: JSON.parse(user.badges),
        stats: {
          totalMessages: user._count.chatMessages,
          totalInteractions: user._count.interactions,
          totalBookmarks: user._count.bookmarks,
          totalQuizAttempts: user._count.quizAttempts,
          totalContactRequests: user._count.contactRequests,
          sectionsVisited: visitedSections.length,
          latestQuizScore: latestQuiz
            ? `${latestQuiz.score}/${latestQuiz.total}`
            : null,
        },
      },
    })
  } catch (error) {
    console.error('User GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

// PUT /api/user — update user profile
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, mode, name, email, image } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required field: userId' },
        { status: 400 }
      )
    }

    // Check user exists
    const existingUser = await db.user.findUnique({
      where: { id: userId },
      select: { id: true },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Build update data
    const updateData: Record<string, string> = {}
    if (mode) updateData.mode = mode
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (image) updateData.image = image

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        mode: updatedUser.mode,
        xp: updatedUser.xp,
        level: updatedUser.level,
        badges: JSON.parse(updatedUser.badges),
      },
    })
  } catch (error) {
    console.error('User PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}
