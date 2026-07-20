import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'guard/jwt.guard';
import { ProductService } from 'src/product/service/product/product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService){}

    @Post('create')
    // @UseGuards(JwtGuard)
    @UseInterceptors(FilesInterceptor('images'))
    create(@Body() body, @UploadedFiles() files: Express.Multer.File[]){
        try{
            return this.service.create(body, files)
        }catch(err) { console.log(err) }
    }

    @Patch(":id")
    @UseGuards(JwtGuard)
    quickUpdate(@Param('id') id: string, @Body() body){
        return this.service.quickUpdate(id, body)
    }

    @Delete("all")
    @UseGuards(JwtGuard)
    deleteAll(){
        return this.service.deleteAll()
    }
    
    @Delete(":id")
    @UseGuards(JwtGuard)
    delete(@Param('id') id: string){
        return this.service.delete(id)
    }

    @Get()
    getProducts(@Query('page') page?: string, @Query('limit') limit?: string){
        return this.service.getProducts(page ? parseInt(page): 1, limit ? parseInt(limit) : 16, { name: 'asc' })
    }

    @Get('admin')
    getProductsAdmin(@Query('page') page?: string, @Query('limit') limit?: string){
        return this.service.getProducts(page ? parseInt(page): 1, limit ? parseInt(limit) : 16, { createdAt: 'desc' })
    }

    @Get('/single/:url')
    getProductByUrl(@Param('url') url: string){
        return this.service.getProductByUrl(url)
    }
}
