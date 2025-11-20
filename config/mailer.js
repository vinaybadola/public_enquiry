import nodemailer from 'nodemailer';
import { smtpHost, smtpPort, emailUser, emailPassword } from './env.config.js';

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: Number(smtpPort) === 465, 
    auth: {
        user: emailUser,
        pass: emailPassword,
    },
});

export default transporter;