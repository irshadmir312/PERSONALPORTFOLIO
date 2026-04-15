import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/gamification — track interaction
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, section, action, metadata } = body

    if (!userId || !section || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, section, action' },
        { status: 400 }
      )
    }

    // Create interaction record
    const interaction = await db.userInteraction.create({
      data: {
        userId,
        section,
        action,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    })

    // Award base XP for interaction
    const xpAmount = getXPForAction(section, action)
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpAmount },
      },
    })

    // Recalculate level (100 XP per level)
    const newLevel = Math.floor(updatedUser.xp / 100) + 1
    if (newLevel > updatedUser.level) {
      await db.user.update({
        where: { id: userId },
        data: { level: newLevel },
      })
    }

    return NextResponse.json({
      success: true,
      interactionId: interaction.id,
      xpEarned: xpAmount,
      totalXp: updatedUser.xp + xpAmount,
    })
  } catch (error) {
    console.error('Gamification POST error:', error)
    return NextResponse.json(
      { error: 'Failed to track interaction' },
      { status: 500 }
    )
  }
}

// GET /api/gamification — also handles /leaderboard via query param
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const endpoint = searchParams.get('endpoint')

    if (endpoint === 'leaderboard') {
      return getLeaderboard()
    }

    return NextResponse.json({
      message: 'Gamification API. Use POST to track interactions, GET?endpoint=leaderboard for leaderboard.',
    })
  } catch (error) {
    console.error('Gamification GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gamification data' },
      { status: 500 }
    )
  }
}

// POST /api/gamification/xp — add XP
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const action = searchParams.get('action')

    if (action === 'xp') {
      return addXP(req)
    }
    if (action === 'badge') {
      return unlockBadge(req)
    }

    return NextResponse.json(
      { error: 'Invalid action. Use ?action=xp or ?action=badge' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Gamification PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to process gamification request' },
      { status: 500 }
    )
  }
}

async function getLeaderboard() {
  const topUsers = await db.user.findMany({
    select: {
      id: true,
      name: true,
      xp: true,
      level: true,
      badges: true,
      isGuest: false,
    },
    orderBy: { xp: 'desc' },
    take: 10,
  })

  // Also include guest users separately
  const allTopUsers = await db.user.findMany({
    select: {
      id: true,
      name: true,
      xp: true,
      level: true,
      badges: true,
      isGuest: true,
    },
    orderBy: { xp: 'desc' },
    take: 10,
  })

  const leaderboard = allTopUsers.map((user, index) => ({
    rank: index + 1,
    id: user.id,
    name: user.name || (user.isGuest ? 'Anonymous Explorer' : 'User'),
    xp: user.xp,
    level: user.level,
    badges: JSON.parse(user.badges),
    isGuest: user.isGuest,
  }))

  return NextResponse.json({
    leaderboard,
    totalParticipants: await db.user.count(),
  })
}

async function addXP(req: NextRequest) {
  const body = await req.json()
  const { userId, amount } = body

  if (!userId || !amount || amount <= 0) {
    return NextResponse.json(
      { error: 'Missing or invalid fields: userId and positive amount required' },
      { status: 400 }
    )
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      xp: { increment: amount },
    },
  })

  // Recalculate level
  const newLevel = Math.floor(updatedUser.xp / 100) + 1
  if (newLevel !== updatedUser.level) {
    await db.user.update({
      where: { id: userId },
      data: { level: newLevel },
    })
  }

  return NextResponse.json({
    success: true,
    xpEarned: amount,
    totalXp: updatedUser.xp,
    level: Math.max(updatedUser.level, newLevel),
  })
}

async function unlockBadge(req: NextRequest) {
  const body = await req.json()
  const { userId, badgeId } = body

  if (!userId || !badgeId) {
    return NextResponse.json(
      { error: 'Missing required fields: userId and badgeId' },
      { status: 400 }
    )
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { badges: true },
  })

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  const currentBadges: string[] = JSON.parse(user.badges)

  if (currentBadges.includes(badgeId)) {
    return NextResponse.json({
      success: true,
      message: 'Badge already unlocked',
      badgeId,
      badges: currentBadges,
    })
  }

  const newBadges = [...currentBadges, badgeId]

  await db.user.update({
    where: { id: userId },
    data: {
      badges: JSON.stringify(newBadges),
      xp: { increment: 25 }, // Bonus XP for badge
    },
  })

  return NextResponse.json({
    success: true,
    message: 'Badge unlocked!',
    badgeId,
    xpEarned: 25,
    badges: newBadges,
  })
}

function getXPForAction(section: string, action: string): number {
  const xpMap: Record<string, Record<string, number>> = {
    hero: { view: 5, interact: 10 },
    projects: { view: 5, click: 10, bookmark: 15 },
    journey: { view: 5, interact: 10 },
    skills: { view: 5, interact: 10 },
    contact: { view: 5, submit: 20 },
    'ai-chat': { message: 2, view: 5 },
    quiz: { start: 5, complete: 20 },
    default: { view: 3, click: 5, interact: 8, complete: 15 },
  }

  return xpMap[section]?.[action] ?? xpMap.default[action] ?? 3
}
