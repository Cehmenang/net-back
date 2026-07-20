import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'guard/jwt.guard';
import { CategoryService } from 'src/category/service/category/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly service: CategoryService){}

    @Post('create')
    @UseGuards(JwtGuard)
    create(@Body() body){
        return this.service.create(body)
    }

    @Get()
    @UseGuards(JwtGuard)
    getCategories(){
        return this.service.getCategories()
    }
}
