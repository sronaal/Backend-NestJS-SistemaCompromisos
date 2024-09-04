import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import {configuraciones} from 'src/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
@Module({
  imports : [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      global:true,
      secret:configuraciones.secret_jwt,
      signOptions: {expiresIn : '1200s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
