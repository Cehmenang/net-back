import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod/v4';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema){}

    transform(value: any, metadata: ArgumentMetadata) {
        try{
            const parsedValue = this.schema.safeParse(value) as any
            if (!parsedValue.success) {
                const customErrors: Record<string, string> = {};
                parsedValue.error.errors.forEach((issue) => {
                    const fieldName = issue.path.join('.');
                    customErrors[fieldName] = issue.message;
                });
                throw new BadRequestException({
                    success: false,
                    message: 'Input data kagak valid, cuy!',
                    errors: customErrors,
                    timestamp: new Date().toISOString(),
                });
            }
            else return parsedValue.data!
        }catch(err){
            throw new BadRequestException('Validation Failed!')
        }
    }
}