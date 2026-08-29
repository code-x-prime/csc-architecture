import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string,
  )
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !service || !message) {
    return NextResponse.json({ error: 'Name, email, area, and message are required.' }, { status: 400 })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    return NextResponse.json({ error: 'Contact form is not configured.' }, { status: 500 })
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Company', company || '—'],
    ['Area', service],
  ]
    .map(([label, value]) => `<tr><td style="padding:6px 12px;color:#53636c;font-weight:600;">${label}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>`)
    .join('')

  const html = `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="color:#10212b;">New inquiry from the CSC website</h2>
      <table style="border-collapse:collapse;">${rows}</table>
      <p style="color:#53636c;font-weight:600;margin-top:16px;">Message</p>
      <p style="white-space:pre-wrap;color:#10212b;">${escapeHtml(message)}</p>
    </div>
  `

  try {
    await sendMail({
      to: adminEmail,
      subject: `New CSC inquiry from ${name}`,
      html,
      replyTo: email,
    })
  } catch (error) {
    console.error('Failed to send contact email', error)
    return NextResponse.json({ error: 'We could not send your message. Please try again shortly.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
