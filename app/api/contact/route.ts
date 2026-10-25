import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAILS = [
  "gurjeetsinghvirdee@gmail.com",
  "uttam.tamboli.office@gmail.com",
];

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"The Outcast Syndicate" <${process.env.SMTP_USER}>`,
      to: TO_EMAILS.join(", "),
      replyTo: email,
      subject: `New enquiry from ${name} - ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`,
      html: `
        <h3>New enquiry from the website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
