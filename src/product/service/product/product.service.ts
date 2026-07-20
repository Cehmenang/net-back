import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/service/upload/upload.service';

type ProductOrderBy = Prisma.ProductOrderByWithRelationInput

@Injectable()
export class ProductService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly upload: UploadService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ){}

    private async invalidateProductsCache() {
        const store: any = (this.cacheManager as any).store;
        if (store?.client) {
            const keys = await store.client.keys('products:page=*');
            if (keys.length > 0) {
                await store.client.del(keys);
            }
        }
    }

    async create(body, files){
        const images = await this.upload.saveFiles(files, 'product')
        body.stock = body.stock ? parseInt(body.stock) : 0
        body.pricelist = body.pricelist ? parseInt(body.pricelist) : null
        body.offlineprice = body.offlineprice ? parseInt(body.offlineprice) : null
        body.netprice = body.netprice ? parseInt(body.netprice) : null
        body.spesification = body.spesification ? JSON.parse(body.spesification) : [];
        body.feature = body.feature ? JSON.parse(body.feature) : [];
        const product = await this.prisma.product.create({ data: {
            ...body, images
        } })
        
        await this.invalidateProductsCache()
        return { status: HttpStatus.ACCEPTED, message: 'Berhasil Upload!', product }
    }

    async quickUpdate(id: string, body){
        const update = await this.prisma.product.update({ where: { id }, data: body })
        if(!update) throw new BadRequestException("Kesalahan dalam Update Produk!")
        await this.invalidateProductsCache()
        return { status: HttpStatus.ACCEPTED, message: 'Berhasil Update!' }
    }

    async delete(id: string){
        const product = await this.prisma.product.findUnique({ where: { id }, select: { id: true, images: true } })
        if (!product) throw new NotFoundException('Produk tidak ditemukan')
        await this.upload.deleteFiles(product.images)
        await this.invalidateProductsCache()
        return this.prisma.product.delete({ where: { id } })
    }

    async deleteAll(){ return await this.prisma.product.deleteMany() }

    async getProducts(page: number, limit: number, orderBy: ProductOrderBy){
        const cacheKey = `products:page=${page}:limit=${limit}`;
 
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached
        
        const skip = (page - 1) * limit
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                orderBy,
                skip,
                take: limit,
            }),
            this.prisma.product.count(),
        ]);
 
        const result = {
            products: data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / limit),
                per_page: limit,
            },
        };
        return result
    }

    async getProductByUrl(url: string){
        const product = await this.prisma.product.findFirst({ where: { url }, include: { category: { select: { title: true } }, brand: { select: { name: true } } } })
        return { status: HttpStatus.ACCEPTED, product }
    }
}
