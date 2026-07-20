import { createZodDto } from "nestjs-zod";
import { LoginSchema} from "schemas/auth.schema";

export class LoginDto extends createZodDto(LoginSchema){}