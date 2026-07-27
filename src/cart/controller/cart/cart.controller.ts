import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'guard/jwt.guard';
import { CartService } from 'src/cart/service/cart/cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly service: CartService){}

    @Get("me")
    @UseGuards(JwtGuard)
    async getCarts(@Req() req){
        return await this.service.getCarts(req.user.id)
    }

    @Post("add")
    @UseGuards(JwtGuard)
    async addCart(@Req() req, @Body() body: { productId: string, quantity: string }){
        return await this.service.addCart(req.user.id, body.productId, parseInt(body.quantity!))
    }

    @Patch("update/:id")
    @UseGuards(JwtGuard)
    async updateCart(@Param("id") id: string, @Body() body: { quantity : string}){
        return await this.service.updateCart(id, parseInt(body.quantity))
    }

    @Delete("delete/:id")
    @UseGuards(JwtGuard)
    async deleteCart(@Param("id") id: string, ){
        return await this.service.deleteCart(id)
    }
}
