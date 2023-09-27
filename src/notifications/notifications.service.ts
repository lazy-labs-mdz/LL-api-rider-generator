import { Injectable } from '@nestjs/common';
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

const notification_center = {
  "created-user": () => { },
  "updated-password": () => { },
  "reset-password": () => { },
  "user-invitation": () => { },
  "rider-shared": () => { }
}

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: " Rider Generator",
    link: 'https://rg.io/'
  }
});

@Injectable()
export class NotificationsService {

  async sendNotification(user, notification, payload) {
    const userData = user._doc;
    if (notification_center[notification]) {
      const { template, subject, attachments, text } = await notification_center[notification](userData, payload);

      const transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const emailBody = mailGenerator.generate(template);

      await transport.sendMail({
        from: process.env.EMAIL_USER,
        to: userData.email,
        subject: `[RG] ${subject}`, 
        text,
        html: emailBody,
        attachments
      });
    }

  }


}
