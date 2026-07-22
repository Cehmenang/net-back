import { Body, Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from 'dtos/auth/LoginDto';
import { RegisterDto } from 'dtos/auth/RegisterDto';
import { JwtGuard } from 'guard/jwt.guard';
import { AuthService } from 'src/auth/service/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService){}

    @Get()
    @UseGuards(JwtGuard)
    async getUsers(@Query('role') role: string){
        return await this.service.getAccounts(role)
    }

    @Get("switch/role")
    async switchRole(@Query('id') id: string){
        return await this.service.switchRole(id)
    }
    
    @Post("register")
    async register(@Body() body: RegisterDto, @Res({ passthrough: true }) response){
        const result = await this.service.register(body)

        response.cookie('accessToken', result.token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            domain: '.bandarmusikjakarta.com',
            sameSite: 'none',
        })

        return { status: HttpStatus.ACCEPTED, message: 'Berhasil login', context: result.context }
    }

    @Post("login")
    async login(@Body() body: LoginDto, @Res({ passthrough: true }) response){
        const result = await this.service.login(body)

        response.cookie('accessToken', result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
            // domain: '.bandarmusikjakarta.com',
            sameSite: 'lax',
        })

        return { status: HttpStatus.ACCEPTED, message: 'Berhasil login', context: result.context }
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logout(@Res({ passthrough: true }) response) {
        response.clearCookie('accessToken');
        return { message: 'Logged out' };
        }
}
