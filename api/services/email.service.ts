import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetEmail = async ({ to, firstName, token }: { to: string, firstName: string, token: string }) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Career Map - Password Reset Request',
    html: `
      <h2>Password Reset Request</h2>

      <p>Hello ${firstName},</p>

      <p>We received a request to reset your Career Map account password.</p>

      <p>Use the token below to reset your password:</p>

      <div style="
        background:#f4f4f4;
        padding:16px;
        border-radius:8px;
        font-size:18px;
        font-weight:bold;
        letter-spacing:1px;
        margin:20px 0;
      ">
        ${token}
      </div>

      <p><strong>Important:</strong> This token expires in 1 hour.</p>

      <p>If you did not request a password reset, you can safely ignore this email.</p>

      <p>
        Regards,<br/>
        Career Map Team
      </p>
    `,
  });
};

export { sendPasswordResetEmail };