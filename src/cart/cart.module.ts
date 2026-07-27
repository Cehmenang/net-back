import { Module } from '@nestjs/common';
import { CartService } from './service/cart/cart.service';
import { CartController } from './controller/cart/cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
