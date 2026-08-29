import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error('SMTP is not configured — missing SMTP_HOST, SMTP_PORT, SMTP_USER, or SMTP_PASSWORD.')
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })

  return transporter
}

export async function sendMail(options: { to: string; subject: string; html: string; replyTo?: string }) {
  const fromEmail = process.env.FROM_EMAIL
  if (!fromEmail) throw new Error('FROM_EMAIL is not configured.')

  return getTransporter().sendMail({
    from: `"CSC Website" <${fromEmail}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  })
}
