import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService){}

    async getCarts(id: string){
        return await this.prisma.cart.findMany({ where: { accountId: id } })
    }
}
