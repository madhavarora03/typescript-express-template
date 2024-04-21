import { MAILER_HOST, MAILER_PASS, MAILER_PORT, MAILER_USER } from '@/config';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: MAILER_HOST,
  port: MAILER_PORT,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
});

export const sendMail = async (
  userId: mongoose.Types.ObjectId,
  userEmail: string,
  subject: mailSubject,
  html: string,
) => {
  console.log(userId, userEmail, subject, html, transport);
};
