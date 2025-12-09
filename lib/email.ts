/**
 * Email Service Module
 * 
 * Provides email sending functionality for the application.
 * Currently configured as a placeholder implementation that logs email details to console.
 * 
 * @module email
 * 
 * TODO: Replace with actual email service (SendGrid, AWS SES, Resend, etc.)
 */

/**
 * Sends an email to the specified recipient.
 * 
 * Currently this is a placeholder implementation that logs the email details
 * to the console instead of actually sending the email.
 * 
 * @param to - The recipient's email address
 * @param subject - The email subject line
 * @param html - The HTML content of the email body
 * @returns A promise that resolves when the email is "sent" (logged)
 * 
 * @example
 * ```typescript
 * await sendEmail(
 *   'user@example.com',
 *   'Welcome to AdhyayanX',
 *   '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
 * );
 * ```
 */
export async function sendEmail(to: string, subject: string, html: string) {
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    console.log('HTML:', html);
}
