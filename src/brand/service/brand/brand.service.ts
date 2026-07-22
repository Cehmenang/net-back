import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/service/upload/upload.service';

@Injectable()
export class BrandService {
    constructor(private readonly prisma: PrismaService, private readonly upload: UploadService){}

    async create(body, file){
        if (!file) throw new BadRequestException('Gambar brand wajib diupload');
        const [image] = await this.upload.saveFiles([file], 'brand')
        const brand = await this.prisma.brand.create({ data: {...body, image} })
        return { status: HttpStatus.ACCEPTED, message: 'Berhasil Membuat Brand!', brand }
    }

    async getBrands(){
        const brands = await this.prisma.brand.findMany()
        return { status: HttpStatus.ACCEPTED, brands }
    }

    async getBrand(name: string){
        const brand = await this.prisma.brand.findFirst({ where: { name }, select: { name: true, description: true, image: true }})
        return { status: HttpStatus.ACCEPTED, brand }
    }

    async delete(id: string){
        const brand = await this.prisma.brand.findUnique({ where: { id }, select: { id: true, image: true } })
        if (!brand) throw new NotFoundException('Produk tidak ditemukan')
        await this.upload.deleteFiles([brand.image])
        // await this.invalidateProductsCache()
        return await this.prisma.brand.delete({ where: { id } })
    }
}
