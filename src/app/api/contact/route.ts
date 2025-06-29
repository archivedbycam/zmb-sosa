import { NextResponse } from "next/server";
import { sendContactEmail } from "../../../lib/email-service";

export async function POST(req: Request) {
  const { name, email, message, subscribe } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, message, subscribe });
    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
} 