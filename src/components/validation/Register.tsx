import { ZodType, z } from "zod";

export type formData = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  password:   string;
  confirmPassword:  string;
  countryCode: string;
  country: string;
  gender: string;
  acceptTerms: boolean;
};

export const registerSchema: ZodType<formData> = z.object({
  firstname: z.string().min(3, "firstname must be at least 3 characters"),
  lastname: z.string().min(3, { message: "lastname must be at least 3 characters" }),
  email: z.string().toLowerCase().min(3, "email is required").email().trim(),
  phoneNumber: z
    .string()
    .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).trim(),
  countryCode: z
    .string()
    .min(1, { message: "Country code is required" })
    .regex(/^\+[1-9]{1}[0-9]{1,14}$/),
  country: z.string().min(1, { message: "Country is required" }).trim(),
  gender: z
    .string()
    .refine((value) => ["female", "male", "other"].includes(value.toLowerCase()), {
      message: "gender is required",
    }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),

  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password must be at least 8 characters" }),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "accept",
  })   
   
});
