import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create reusable transporter
function createTransporter() {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error('SMTP configuration is incomplete. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.')
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort, 10),
    secure: parseInt(smtpPort, 10) === 465, // true for port 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = await req.json()

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const recipientEmail = process.env.SMTP_USER || ''
    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'Email recipient not configured' },
        { status: 500 }
      )
    }

    // 1. Send email notification via SMTP
    const transporter = createTransporter()

    const mailOptions = {
      from: `"Portfolio Contact" <${recipientEmail}>`,
      to: recipientEmail,
      replyTo: recipientEmail,
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #eae5ec; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #c2a4ff 0%, #7c3aed 100%); padding: 24px 32px;">
            <h1 style="margin: 0; color: #0b080c; font-size: 24px;">📩 New Contact Message</h1>
            <p style="margin: 4px 0 0; color: #0b080c; opacity: 0.8;">Someone reached out from your portfolio</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <strong style="color: #c2a4ff;">👤 Name</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: right;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <strong style="color: #c2a4ff;">📞 Phone</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); text-align: right;">
                  <a href="tel:${phone}" style="color: #c2a4ff; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0;">
                  <strong style="color: #c2a4ff;">💬 Message</strong>
                </td>
                <td style="padding: 12px 0; text-align: right;">
                  &nbsp;
                </td>
              </tr>
            </table>
            <div style="background: rgba(194, 164, 255, 0.08); border-left: 4px solid #c2a4ff; padding: 16px 20px; border-radius: 0 12px 12px 0; margin-top: 8px;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #8b8498;">
                🕐 Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}<br>
                <span style="font-size: 12px;">Irshad Portfolio — Contact Form</span>
              </p>
            </div>
          </div>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nPhone: ${phone}\nMessage:\n${message}\n\nReceived: ${new Date().toISOString()}`,
    }

    await transporter.sendMail(mailOptions)

    // 2. Store contact message in database
    const { db } = await import('@/lib/db')

    await db.contactRequest.create({
      data: {
        name,
        email: recipientEmail,
        phone,
        message,
      },
    })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully! I will get back to you soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process request'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
