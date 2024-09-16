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
    password: z.string().min(8, "Password must be at least 8 characters"),

    // Only required for sign-up
    name:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "Name must be at least 3 characters"),

    avatar:
      type === "sign-in"
        ? z.string().optional()
        : z.string().url("Please enter a valid avatar URL").optional(),

    // Conditionally required fields for sign-up
    age:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .regex(/^\d+$/, "Age must be a positive integer")
            .optional(),

    gender:
      type === "sign-in"
        ? z.string().optional()
        : z.enum(["male", "female", "other"]).optional(),

    height:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .regex(/^\d+$/, "Height must be a positive number")
            .optional(),

    weight:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .regex(/^\d+$/, "Weight must be a positive number")
            .optional(),

    // Activity level as an enum (optional for both)
    activityLevel:
      type === "sign-in"
        ? z.string().optional()
        : z
            .enum(["sedentary", "light", "moderate", "active", "very_active"])
            .optional(),

    // Only for sign-up
    allergies:
      type === "sign-in"
        ? z.array(z.string()).optional()
        : z
            .array(z.string())
            .min(0, "Please provide valid allergies")
            .optional(),

    medications:
      type === "sign-in"
        ? z.array(z.string()).optional()
        : z
            .array(z.string())
            .min(0, "Please provide valid medications")
            .optional(),
  });
