import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Proyecto } from './entities/proyecto.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Proyecto,Usuario,Cliente])],
  controllers: [ProyectoController],
  providers: [ProyectoService],
  exports:[TypeOrmModule.forFeature([Proyecto])]
})
export class ProyectoModule {}
