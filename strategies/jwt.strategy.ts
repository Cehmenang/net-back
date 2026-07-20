import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService){
        super({
            jwtFromRequest: (req: Request)=>{
                return req.cookies?.accessToken || null
            },
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') as string
        })
    }

    async validate(payload: any){
        return { email: payload.email, username: payload.username }
    }
}