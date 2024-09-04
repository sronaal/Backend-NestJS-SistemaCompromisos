import { Module } from '@nestjs/common';
import { CompromisosService } from './compromisos.service';
import { CompromisosController } from './compromisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compromiso } from './entities/compromiso.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Compromiso,Usuario,Cliente])],
  controllers: [CompromisosController],
  providers: [CompromisosService],
  exports: [TypeOrmModule.forFeature([Compromiso])]
})
export class CompromisosModule {}
