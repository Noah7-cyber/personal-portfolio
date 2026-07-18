import { z } from 'zod';
export const contactSchema=z.object({name:z.string().trim().min(2).max(80),email:z.string().trim().email().max(120),subject:z.string().trim().min(4).max(120),message:z.string().trim().min(20).max(1500),company:z.string().max(0).optional().or(z.literal(''))});
export type ContactInput=z.infer<typeof contactSchema>;
