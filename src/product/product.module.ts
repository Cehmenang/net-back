import { Module } from '@nestjs/common';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './service/product/product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService]
})
export class ProductModule {}
