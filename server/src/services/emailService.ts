import { Resend } from 'resend';

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendMentionAlert(email: string, keyword: string, mentions: any[]): Promise<void> {
    try {
      const mentionsList = mentions.map(mention => 
        `• ${mention.platform.toUpperCase()}: "${mention.text.substring(0, 100)}..." - ${mention.url}`
      ).join('\n');

      await this.resend.emails.send({
        from: 'SocialPing <alerts@socialping.com>',
        to: email,
        subject: `🔔 New mentions found for "${keyword}"`,
        text: `
Hi there!

We found ${mentions.length} new mention(s) for your keyword "${keyword}":

${mentionsList}

Visit your dashboard to see more details: https://socialping.com/dashboard

Best regards,
The SocialPing Team
        `
      });

      console.log(`📧 Email alert sent to ${email} for keyword "${keyword}"`);
    } catch (error) {
      console.error('Email sending error:', error);
    }
  }
}