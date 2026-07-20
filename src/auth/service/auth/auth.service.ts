import { UnauthorizedException } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginType, RegisterType } from 'schemas/auth.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService){}

    getContext(user){
        return { username: user.username, role: user.role }
    }

    async register(body: RegisterType){
        try{
            body.password = await bcrypt.hash(body.password, 10)
            const user = await this.prisma.account.create({ data: body })

            const context = this.getContext(user)
            if(user) return { status: HttpStatus.ACCEPTED, context }
        }catch(err){ return err }
    }

    async switchRole(id: string){
        try{
            const user = await this.prisma.account.update({ where: { id, role: 'USER' }, data: { role: "ADMIN" } })
            return { status: HttpStatus.ACCEPTED, message: 'Berhasil Ubah Role!', user }
        }catch(err){ return err }
    }

    async login(body: LoginType){
        try{
            const user = await this.prisma.account.findFirst({ where: { username: body.username } })
            if(!user) throw new UnauthorizedException()
            const passwordValidation = await bcrypt.compare(body.password, user.password)
            if(!passwordValidation) throw new Error("Password Tidak Sesuai!")
            
            const token = await this.jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role })

            const context = this.getContext(user)
            return { token, context }
        }catch(err){ return err }   
    }

    async getAccounts(role: string){
        try{
            const account = await this.prisma.account.findMany({ where: { role: role.toUpperCase() == "USER" ? "USER" : "ADMIN" } })
            return { status: HttpStatus.ACCEPTED, account }
        }catch(err){ console.log(err) }
    }
}
