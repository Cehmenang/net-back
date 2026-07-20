import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService)=>({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1h' }
    })
  })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
