import { ZodType, z } from "zod";

export type loginFormData = {
  email: string;
  password: string;
};

export const loginSchema: ZodType<loginFormData> = z.object({
 
  email: z.string().min(1, "email is required").trim(),
  password: z.string().min(1, "password field is empty")   
   
});
