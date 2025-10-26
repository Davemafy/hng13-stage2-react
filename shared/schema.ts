import { z } from "zod";

// User types
export type User = {
  id: string;
  username: string;
  password: string;
};

export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Ticket types
export type Ticket = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const insertTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["open", "in_progress", "closed"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export type InsertTicket = z.infer<typeof insertTicketSchema>;

// Auth schemas
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
