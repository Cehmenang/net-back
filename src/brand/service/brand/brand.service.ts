import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
    constructor(private readonly prisma: PrismaService){}

    async create(body){
        const brand = await this.prisma.brand.create({ data: body })
        return { status: HttpStatus.ACCEPTED, message: 'Berhasil Membuat Brand!', brand }
    }

    async getBrands(){
        const brands = await this.prisma.brand.findMany()
        return { status: HttpStatus.ACCEPTED, brands }
    }
}
