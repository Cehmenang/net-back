import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'guard/jwt.guard';
import { BrandService } from 'src/brand/service/brand/brand.service';

@Controller('brand')
export class BrandController {
    constructor(private readonly service: BrandService){}

    @Post('create')
    @UseGuards(JwtGuard)
    create(@Body() body){
        return this.service.create(body)
    }

    @Get()
    @UseGuards(JwtGuard)
    getBrands(){
        return this.service.getBrands()
    }
}
