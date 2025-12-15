/**
 * Email Service Module
 *
 * Provides email sending functionality using Nodemailer.
 * Requires SMTP configuration in environment variables.
 *
 * @module email
 */

import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || '"AdhyayanX Support" <mrigeshdeshpande246@gmail.com>';

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/**
 * Sends an email to the specified recipient.
 *
 * @param to - The recipient's email address
 * @param subject - The email subject line
 * @param html - The HTML content of the email body
 * @returns A promise that resolves when the email is sent
 */
export async function sendEmail(to: string, subject: string, html: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "SMTP configuration missing. Falling back to console logging.",
    );
    console.log("--- EMAIL MOCK ---");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("HTML:", html);
    console.log("------------------");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
   return;
  }
}
