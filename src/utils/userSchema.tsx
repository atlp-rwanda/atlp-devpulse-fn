import { z } from "zod";

export const userSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter valid email"),
  telephone: z
    .string()
    .regex(/^[0-9]+$/, "Must contain only numbers")
    .min(10, "Must be at least 10 digits"),
  code: z
    .string()
    .regex(/^[0-9,+,-]+$/, "Must contain only numbers")
    .min(4, "Must be at least 4 digits")
    .startsWith("+", "Must start with +"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one symbol")
    .optional()
    .or(z.literal("")),
  picture: z.string().optional(),
});

export type TuserSchema = z.infer<typeof userSchema>;
