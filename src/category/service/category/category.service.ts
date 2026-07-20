import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService){}
    
    async create(body){
        const category = await this.prisma.category.create({ data: body })
        return { status: HttpStatus.ACCEPTED, message: 'Berhasil Membuat Category!', category}
    }

    async getCategories(){
        const categories = await this.prisma.category.findMany()
        return { status: HttpStatus.ACCEPTED, categories }
    }
}
