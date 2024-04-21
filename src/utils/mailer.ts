import {
  FRONTEND_DOMAIN,
  MAILER_HOST,
  MAILER_PASS,
  MAILER_PORT,
  MAILER_USER,
} from '@/config';
import { User } from '@/models';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import HttpError from './HttpError';
import logger from './logger';

export const sendEmail = async (
  userId: mongoose.Types.ObjectId,
  userEmail: string,
  emailType: emailType,
) => {
  try {
    const token = uuidv4();

    if (emailType === 'reset') {
      await User.findByIdAndUpdate(userId, {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hour
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        verifyEmailToken: token,
        verifyTokenExpires: new Date(Date.now() + 3600000), // 1 hour
      });
    }

    const transporter = nodemailer.createTransport({
      host: MAILER_HOST,
      port: Number(MAILER_PORT),
      auth: {
        user: MAILER_USER,
        pass: MAILER_PASS,
      },
    });

    const mailOptions = {
      from: 'eragon.cube@outlook.com',
      to: userEmail,
      subject:
        emailType === 'verify' ? 'Verify your Email' : 'Reset your password',
      html: `<p>Click <a href="${FRONTEND_DOMAIN}/verifyEmail?token=${token}">here</a> to ${
        emailType === 'verify' ? 'verify your email' : 'reset your password'
      } or copy and paste the link below in your browser.
      <br> ${FRONTEND_DOMAIN}/verifyEmail?token=${token}
      </
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    logger.error(error);
    throw new HttpError(500, 'Something went wrong with the email service.');
  }
};
