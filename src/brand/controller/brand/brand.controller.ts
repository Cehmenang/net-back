import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'guard/jwt.guard';
import { BrandService } from 'src/brand/service/brand/brand.service';

@Controller('brand')
export class BrandController {
    constructor(private readonly service: BrandService){}

    @Post('create')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() body, @UploadedFile() file: Express.Multer.File){
        return this.service.create(body, file)
    }

    @Get()
    getBrands(){
        return this.service.getBrands()
    }

    @Delete(":id")
    @UseGuards(JwtGuard)
    deleteBrand(@Param('id') id: string){
        return this.service.delete(id)
    }

}
