import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, subject, message, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot: bots fill this

  const valid =
    typeof name === "string" && name.trim().length >= 2 &&
    typeof email === "string" && /^\S+@\S+\.\S+$/.test(email) &&
    typeof subject === "string" && subject.trim().length >= 3 &&
    typeof message === "string" && message.trim().length >= 10 && message.length <= 5000;
  if (!valid) return res.status(400).json({ error: "Please fill every field correctly" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio contact" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL || process.env.EMAIL_USER,
      replyTo: `${name} <${email}>`, // hit Reply in Gmail to answer the visitor directly
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Mail error:", e);
    return res.status(500).json({ error: "Message could not be sent" });
  }
}
