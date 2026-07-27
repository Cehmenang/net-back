import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'guard/jwt.guard';
import { CartService } from 'src/cart/service/cart/cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly service: CartService){}

    @Get("me")
    @UseGuards(JwtGuard)
    async getCarts(@Req() req){
        console.log(req.user!, 'user')
        return await this.service.getCarts(req.user.id)
    }
}
