import { Module } from '@nestjs/common';
import { BrandService } from './service/brand/brand.service';
import { BrandController } from './controller/brand/brand.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BrandService],
  controllers: [BrandController]
})
export class BrandModule {}
