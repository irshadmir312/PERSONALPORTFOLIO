import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/visitor — track visitor
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ip, path, referrer } = body

    await db.visitor.create({
      data: {
        ip: ip || null,
        path: path || null,
        referrer: referrer || null,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Visitor tracked',
    })
  } catch (error) {
    console.error('Visitor POST error:', error)
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}

// GET /api/visitor — return visitor stats
export async function GET() {
  try {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Total visitors all time
    const totalAllTime = await db.visitor.count()

    // Total visitors today
    const totalToday = await db.visitor.count({
      where: {
        createdAt: { gte: startOfDay },
      },
    })

    // Unique visitors (by IP) all time
    const uniqueIpsAllTime = await db.visitor.groupBy({
      by: ['ip'],
      where: { ip: { not: null } },
    })
    const uniqueVisitorsAllTime = uniqueIpsAllTime.length

    // Unique visitors today
    const uniqueIpsToday = await db.visitor.groupBy({
      by: ['ip'],
      where: {
        ip: { not: null },
        createdAt: { gte: startOfDay },
      },
    })
    const uniqueVisitorsToday = uniqueIpsToday.length

    // Top visited paths
    const topPaths = await db.visitor.groupBy({
      by: ['path'],
      where: { path: { not: null } },
      _count: { path: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    })

    const pathStats = topPaths
      .filter((p) => p.path !== null)
      .map((p) => ({
        path: p.path,
        visits: p._count.path,
      }))

    // Top referrers
    const topReferrers = await db.visitor.groupBy({
      by: ['referrer'],
      where: { referrer: { not: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 5,
    })

    const referrerStats = topReferrers
      .filter((r) => r.referrer !== null)
      .map((r) => ({
        referrer: r.referrer,
        visits: r._count.referrer,
      }))

    return NextResponse.json({
      totalToday,
      totalAllTime,
      uniqueVisitorsToday,
      uniqueVisitorsAllTime,
      topPaths: pathStats,
      topReferrers: referrerStats,
    })
  } catch (error) {
    console.error('Visitor GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor stats' },
      { status: 500 }
    )
  }
}
