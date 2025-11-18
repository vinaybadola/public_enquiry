# Node.js Backend Conversion & Setup

**Date:** 17/11/2025

## Summary
This project involves converting an existing **Next.js backend** to a **Node.js backend** with a clean and scalable folder structure. All routes, controllers, models, and validators have been modularized for better maintainability.

## Folder & Route Structure

- `contact-sender/`  
  Handles **contact form submissions**.

- `email-sender/`  
  Handles **sending emails** to users and admins.

- `platform-sender/`  
  Handles **platform-specific form submissions**.

## Key Implementations

1. **Complete Route Implementation**  
   - All three modules are fully functional with request validation, database integration, and email sending.

2. **Sensitive Data Management**  
   - API keys, database credentials, and email passwords are stored securely in `.env` files.  
   - `.env` is excluded from Git using `.gitignore`.

3. **Modular Structure**  
   - Separate folders for controllers, models, and validators for each module.  
   - Ensures **scalability and maintainability**.

4. **Request Validation**  
   - `zod` schemas ensure correct data types and required fields before database insertion.

5. **Error Handling**  
   - Consistent error responses with proper logging using `try/catch`.

## Benefits

- **Highly maintainable** and production-ready architecture.  
- Easy to extend with new routes or modules.  
- Senior developers can easily understand the structure and workflow.

## Tech Stack / Packages Used

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Zod (Validation)  
- Nodemailer (Email sending)  
- dotenv (Environment variables management)  


**Date:** 17/11/2025