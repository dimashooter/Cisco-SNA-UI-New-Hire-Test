import { z } from 'zod';

export const FormValidator = z.object({
  id: z.number(),
  jobTitle: z.string(),
  name: z.string().min(3).max(16),
  tenure: z.string(),
  gender: z.string(),
});

export type Form = z.infer<typeof FormValidator>
