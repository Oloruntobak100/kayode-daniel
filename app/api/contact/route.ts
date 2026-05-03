import { NextResponse } from "next/server";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 12_000;

function isValidEmail(s: string): boolean {
  if (s.length > MAX_EMAIL) return false;
  // Pragmatic check — n8n / mail steps can validate again
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Contact form is not configured" },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json(
      { error: "Please enter your name (required)." },
      { status: 400 }
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!message || message.length < 3) {
    return NextResponse.json(
      { error: "Please enter a message (at least a few characters)." },
      { status: 400 }
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 }
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
        source: "portfolio-contact",
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the messaging service." },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Could not deliver your message. Try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
