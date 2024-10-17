import { z, ZodType } from "zod";

interface UserData {
  email: string;
  password: string;
}

export const userSchema: ZodType<UserData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password is too short" })
    .max(20, { message: "password is too long" })
    .regex(/\d/, {message: "Password must contain at least one digit"})
    .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
});

