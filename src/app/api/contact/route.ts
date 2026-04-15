import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

const PROPOSAL_SYSTEM_PROMPT = `You are an AI assistant for Irshad Majeed Mir's portfolio website. A visitor has submitted a contact/project inquiry. Generate a professional, personalized project proposal response.

## About Irshad Majeed Mir
- AI/ML Engineer & Data Scientist
- Full Stack Developer (React, Next.js, Node.js, Django, Flask)
- Expertise: Machine Learning, Deep Learning, NLP, Computer Vision, Data Engineering
- Tools: TensorFlow, PyTorch, scikit-learn, Pandas, Hadoop, Spark, Docker, AWS, GCP
- Experience with fraud detection, recommendation systems, predictive analytics, NLP pipelines

## Your Task
Generate a concise but comprehensive proposal that:
1. Acknowledges the specific project type and requirements
2. Outlines a recommended approach (high-level technical approach)
3. Provides a rough timeline estimate based on the project complexity
4. Mentions relevant past experience or similar projects
5. Includes next steps for getting started
6. Is professional yet warm in tone

Keep the proposal under 400 words. Format with clear sections using markdown. Be specific to the project type mentioned - don't use generic filler.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, name, email, budget, projectType, timeline, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message' },
        { status: 400 }
      )
    }

    // Generate AI proposal
    const proposalPrompt = `Generate a project proposal for the following inquiry:

- **Client Name**: ${name}
- **Email**: ${email}
- **Project Type**: ${projectType || 'Not specified'}
- **Budget**: ${budget || 'Not specified'}
- **Timeline**: ${timeline || 'Not specified'}
- **Message**: ${message}

Please provide a professional, tailored project proposal.`

    const messages: Array<{ role: 'user' | 'system' | 'assistant'; content: string }> = [
      { role: 'system', content: PROPOSAL_SYSTEM_PROMPT },
      { role: 'user', content: proposalPrompt },
    ]

    const zai = await ZAI.create()
    const aiResponse = await zai.chat.completions.create({ messages })
    const proposal = typeof aiResponse === 'string'
      ? aiResponse
      : aiResponse?.content || aiResponse?.message?.content || JSON.stringify(aiResponse)

    // Save contact request to database
    const contactRequest = await db.contactRequest.create({
      data: {
        userId: userId || null,
        name,
        email,
        budget: budget || null,
        projectType: projectType || null,
        timeline: timeline || null,
        message,
        proposal,
      },
    })

    // Track XP if userId provided
    if (userId) {
      try {
        await db.userInteraction.create({
          data: {
            userId,
            section: 'contact',
            action: 'submit',
            metadata: JSON.stringify({ contactRequestId: contactRequest.id }),
          },
        })

        // Award XP for contact submission
        await db.user.update({
          where: { id: userId },
          data: { xp: { increment: 15 } },
        })
      } catch {
        // Non-critical
      }
    }

    return NextResponse.json({
      success: true,
      proposal,
      contactRequestId: contactRequest.id,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to process your contact request. Please try again.' },
      { status: 500 }
    )
  }
}
