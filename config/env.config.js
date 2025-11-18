import { config } from 'dotenv';
config();

export const dbUri = process.env.MONGO_URI;
export const port = process.env.PORT || 8000;

export const whatsappApiUrl = process.env.NEXT_PUBLIC_WHATSAPP_API;
export const whatsappType = process.env.WHATSAPP_TYPE_SOURCE || "gtel-website-inquiry";
export const whatsappSupportType = process.env.WHATSAPP_SUPPORT_TYPE || "new connection";

export const smtpHost = process.env.SMTP_HOST;
export const smtpPort = process.env.SMTP_PORT;
export const emailUser = process.env.EMAIL;
export const emailPassword = process.env.EMAIL_PASSWORD;
export const fromEmail = process.env.FROM_EMAIL;
export const appName = process.env.APP_NAME;
export const environment = process.env.NODE_ENV || 'DEVELOPMENT';

export const InternalEmailSupport = process.env.INTERNAL_EMAIL_SUPPORT;
export const InternalEmailSales = process.env.INTERNAL_EMAIL_SALES;

export const allowedOrigins = [
    'https://hradmin.gtel.in',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://www.gtel.in',
    'http://localhost:8003',
    'http://127.0.0.1:5500',
    'https://portal.gtel.in',
    'https://cp.gtel.in',
    'https://sales.gtel.in',
    'https://noc.gtel.in'
];

export const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
export const allowedCredentials = true;
export const allowedHeaders = ["Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"];
export const allowedExposedHeaders = ["Authorization"];

export const turnstileToken = process.env.TURNSTILE_SECRET_KEY;