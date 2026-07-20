import { Module } from '@nestjs/common';
import { CategoryService } from './service/category/category.service';
import { CategoryController } from './controller/category/category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
