import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contact } from '@/lib/constants';
import { contactSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Please send a valid contact form.' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check the form fields and try again.' },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  const key = process.env.RESEND_API_KEY;
  const text = `From: ${data.name} <${data.email}>\n\n${data.message}`;

  if (!key || !from) {
    return NextResponse.json({
      ok: false,
      mailto: `mailto:${to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(text)}`,
      message: 'Your message is ready. Open your email app below to send it to Noah.',
    });
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Portfolio contact: ${data.subject}`,
      text,
    });
    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: `Your message could not be delivered. Please try again or email ${contact.email} directly.`,
        },
        { status: 502 },
      );
    }
    return NextResponse.json({
      ok: true,
      message: 'Message sent. Thanks for reaching out — Noah can reply by email.',
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: `Could not send your message. Please try again or email ${contact.email} directly.`,
      },
      { status: 500 },
    );
  }
}
