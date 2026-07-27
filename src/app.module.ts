import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { SearchModule } from './search/search.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot({ 
      isGlobal: true
   }), 
      CacheModule.registerAsync({
        isGlobal: true,
        useFactory: async () => ({
          store: await redisStore({
          socket: {
              host: process.env.REDIS_HOST || 'localhost',
              port: Number(process.env.REDIS_PORT) || 6379,
          },
          password: process.env.REDIS_PASSWORD || undefined,
          database: Number(process.env.REDIS_DB) || 1, // <- ini kuncinya, pisah dari BMJ
      }),
    ttl: 5 * 60 * 1000,
  }),
}),
   UploadModule, BrandModule, CategoryModule, PrismaModule, AuthModule, ProductModule, SearchModule, CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
