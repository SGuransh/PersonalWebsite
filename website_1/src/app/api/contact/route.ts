import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function escapeHtml(input: string | unknown) {
  if (typeof input !== "string") return ""
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const toAddress = process.env.CONTACT_TO || process.env.SMTP_USER;
// If CONTACT_ENABLED is explicitly set, respect it. Otherwise enable automatically in development
const contactEnabledEnv = process.env.CONTACT_ENABLED
const contactEnabled = typeof contactEnabledEnv === "undefined" ? process.env.NODE_ENV === "development" : contactEnabledEnv === "true"

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
  // We don't throw here because the dev server may still want to run; handler will return error at runtime.
  console.warn("SMTP not fully configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.");
}

export async function POST(request: Request) {
  if (!contactEnabled) {
    console.warn(
      "Contact form disabled via CONTACT_ENABLED env flag. To enable locally set CONTACT_ENABLED=true in .env.local and restart the dev server."
    )
    return NextResponse.json({ error: "Contact form is disabled" }, { status: 503 })
  }
  try {
    const body: ContactPayload = await request.json();

    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const now = new Date()
    const dateIso = now.toISOString()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const safeName = escapeHtml(body.name)
    const safeEmail = escapeHtml(body.email)
    const safeSubject = escapeHtml(body.subject || `Website contact from ${body.name}`)
    const safeMessage = escapeHtml(body.message)

    const mailOptions = {
      from: `"${safeName}" <${safeEmail}>`,
      to: toAddress,
      subject: safeSubject,
      text: `Name: ${body.name}\nEmail: ${body.email}\nDate: ${dateIso}\n\n${body.message}`,
      html: `
        <!doctype html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>${safeSubject}</title>
        </head>
        <body style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; background:#f5f7fa; margin:0; padding:24px;">
          <div style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 8px 30px rgba(16,24,40,0.08);">
            <div style="padding:20px 24px;border-bottom:1px solid #eef2f7;background:linear-gradient(90deg,#ffffff,#fbfdff);">
              <h2 style="margin:0;font-size:18px;color:#0f172a">New message from your website</h2>
              <p style="margin:6px 0 0;color:#475569;font-size:13px">${safeSubject}</p>
            </div>
            <div style="padding:18px 24px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:14px;color:#0f172a;">
                <tr>
                  <td style="width:120px;padding:6px 0;font-weight:600;color:#475569">Name</td>
                  <td style="padding:6px 0">${safeName}</td>
                </tr>
                <tr>
                  <td style="width:120px;padding:6px 0;font-weight:600;color:#475569">Email</td>
                  <td style="padding:6px 0"><a href="mailto:${safeEmail}" style="color:#0ea5a4;text-decoration:none">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="width:120px;padding:6px 0;font-weight:600;color:#475569">Date</td>
                  <td style="padding:6px 0">${dateIso}</td>
                </tr>
              </table>

              <div style="background:#f8fafc;border:1px solid #e6eef6;padding:14px;border-radius:6px;color:#0f172a;white-space:pre-wrap;line-height:1.5">${safeMessage}</div>
            </div>
            <div style="padding:14px 24px;background:#fbfdff;border-top:1px solid #eef2f7;text-align:right;font-size:13px;color:#475569">
              <a href="${siteUrl}" style="color:#0ea5a4;text-decoration:none">View site</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true, info });
  } catch (err: any) {
    console.error("Error sending contact email:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
