import { z } from "zod";

export const AuthSchema = (type: FormType) => {
  return z.object({
    username:
      type === "sign-up"
        ? z
            .string()
            .min(2, { message: "Username must be at least 2 characters." })
            .max(30, { message: "Username must be at most 30 characters." })
            .regex(/^[a-zA-Z0-9_]+$/, {
              message:
                "Username can only contain letters, numbers, and underscores.",
            })
            .optional()
        : z.string().optional(),
    email: z.email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(100, { message: "Password must be at most 100 characters." }),
  });
};
