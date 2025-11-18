import nodemailer from 'nodemailer';
import { smtpHost, smtpPort, emailUser, emailPassword, environment } from './env.config.js';

// Utility function to create and return a configured Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: environment === 'PRODUCTION', // true for 465, false for other ports
    auth: {
        user: emailUser,
        pass: emailPassword,
    },
});

export default transporter;