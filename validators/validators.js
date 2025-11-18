import { z } from "zod";

const mobileSchema = z
    .string({ required_error: "Mobile number is required" })
    .trim()
    .regex(/^[0-9]+$/, { message: "Mobile number must contain only digits." })
    .min(10, { message: "Mobile number must be at least 10 digits." })
    .max(15, { message: "Mobile number must not exceed 15 digits." });

const nameSchema = z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(255, { message: "Name must not exceed 255 characters." });

const emailSchema = z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters." })
    .max(255, { message: "Email must not exceed 255 characters." });


//Contact Schema 
const ContactSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    mobile: mobileSchema,
    usermessage: z.string({ required_error: "Message is required" }).trim().optional(),
    type: z.string({ required_error: "Type is required" }).trim(),
    subject: z.string({ required_error: "Subject is required" }).trim(),
});

//  Email Schema 
const EmailSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    mobile: mobileSchema,

    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(2, { message: "City must be at least 2 characters." })
        .max(100, { message: "City must not exceed 100 characters." }),

    serviceType: z.string({ required_error: "Service type is required" }).trim(),
    supportType: z.string({ required_error: "Support type is required" }).trim(),
});

//  Platform Schema 
const platformSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    mobile: mobileSchema,
    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(2, { message: "City must be at least 2 characters." })
        .max(100, { message: "City must not exceed 100 characters." }),
});

export { ContactSchema, EmailSchema, platformSchema };
