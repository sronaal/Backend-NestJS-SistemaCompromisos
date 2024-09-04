import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Usuario } from './entities/usuario.entity';
import { Compromiso } from '../compromisos/entities/compromiso.entity';

@Module({

  imports:[TypeOrmModule.forFeature([Usuario, Compromiso])],
  controllers: [UsuarioController, ],
  providers: [UsuarioService],
  exports:[TypeOrmModule.forFeature([Usuario])]
})
export class UsuarioModule {}
