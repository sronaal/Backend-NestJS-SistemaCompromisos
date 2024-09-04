import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthLogin } from './dto/auth-login.dto';
import { AuthSucessDTO } from './interface/auth-sucess.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interface/jwt-payload.interface';
import { TokenGoogle } from './interface/token-google.interface';
import { IsEmpty } from 'class-validator';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(Usuario)
        private usuarioRepositorio: Repository<Usuario>,
        private jwtService: JwtService
    ) { }


    async validarSiCorreoExiste(correo: string) {

        let usuario = await this.usuarioRepositorio.findOne({
                where: { correo: correo },
                relations: {
                    rol: true
                }})

       
        
        return usuario

    }

    async agregarIdGoogle(usuario: Usuario, data_token: TokenGoogle) {


        let usuarioFind = await this.validarSiCorreoExiste(usuario.correo)

       

        if (usuario.id_google == null) {

            usuario.id_google = data_token.user_id
            this.usuarioRepositorio.update(usuario.id, usuario)

        }

        return usuario;







    }

    async generarJWTAuth(data: JWTPayload) {

        return this.jwtService.sign(data)

    }

    async decodificarToken(token: string) {

        return this.jwtService.decode(token)


    }



}