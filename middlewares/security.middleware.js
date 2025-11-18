import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import { allowedOrigins, allowedMethods, allowedCredentials, allowedHeaders, allowedExposedHeaders } from "../config/env.config.js";

const securityMiddleware = (app) => {

  app.use(cors({
    origin: allowedOrigins,
    methods: allowedMethods,
    credentials: allowedCredentials,
    allowedHeaders: allowedHeaders,
    exposedHeaders: allowedExposedHeaders
  }));

  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(helmet());

  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "https:"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      frameAncestors: [
        "'self'",
        "https://sales.gtel.in/",
        "http://localhost:3000" // optional for local testing
      ],
    },
  }));

  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));


};

export default securityMiddleware;