import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const authFormSchema = (type: string) =>
  z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8),

    name:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "Name must be at least 3 characters"),
    experience:
      type === "sign-in"
        ? z.enum(["beginner", "intermediate", "advanced"]).optional()
        : z.enum(["beginner", "intermediate", "advanced"]),
    avatar:
      type === "sign-in"
        ? z.string().optional()
        : z.string().url("Please enter a valid avatar URL").optional(),

    phone:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .optional(),
    username:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "Username must be at least 3 characters"),
  });
