import { z } from "zod/v4";

export const RegisterSchema = z.object({
    username: z.string().min(3, 'Minimal Panjang Username 3 Karakter!'),
    email: z.string().email({ message: 'Bukan Email Yang Valid!' }),
    password: z.string().min(5, 'Minimal Panjang Password 5 Karakter!')
})

export const LoginSchema = z.object({
    username: z.string().min(3, 'Minimal Panjang Username 3 Karakter!'),
    password: z.string().min(5, 'Minimal Panjang Password 5 Karakter!')
})

export type RegisterType = z.infer<typeof RegisterSchema>
export type LoginType = z.infer<typeof LoginSchema>