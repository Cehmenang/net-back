import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService){}

    async getCarts(id: string){
        const carts = await this.prisma.cart.findMany({ where: { accountId: id }, include: { product: true } })
        return { carts }
    }

    async addCart(id: string, productId: string, quantity: number){
        const cart = await this.prisma.cart.upsert({
            where: {
                accountId_productId: { accountId: id, productId },
            },
            update: {
                quantity: { increment: quantity },
            },
            create: {
                accountId: id,
                productId,
                quantity,
            },
        });
        if(cart) return { status: HttpStatus.ACCEPTED, message: "Berhasil Menambahkan Produk!" }
    }

    async deleteCart(id: string){
        const deleted = await this.prisma.cart.delete({ where: { id } })
        if(deleted) return { status: HttpStatus.ACCEPTED, message: 'Berhasil Menghapus Keranjang!' }
    }
}
