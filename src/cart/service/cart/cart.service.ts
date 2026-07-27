import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService){}

    async getCarts(id: string){
        const carts = await this.prisma.cart.findMany({ where: { accountId: id }, include: { product: true } })
        return { carts }
    }
}
