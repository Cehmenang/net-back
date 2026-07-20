import { createZodDto } from "nestjs-zod";
import { RegisterSchema } from "schemas/auth.schema";

export class RegisterDto extends createZodDto(RegisterSchema){}