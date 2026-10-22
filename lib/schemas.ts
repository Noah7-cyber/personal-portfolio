import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name (at least 2 characters).')
    .max(80, 'Please keep your name under 80 characters.'),
  email: z.string().trim().email('Please enter a valid email address.').max(120),
  subject: z.string().trim().min(4, 'Add a subject with at least 4 characters.').max(120),
  message: z
    .string()
    .trim()
    .min(20, 'Please share a little more (at least 20 characters).')
    .max(1500, 'Please keep your message under 1,500 characters.'),
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
