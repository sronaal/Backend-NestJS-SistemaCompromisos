import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Cliente } from './entities/cliente.entity';
import { Compromiso } from '../compromisos/entities/compromiso.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente, Compromiso])],
  controllers: [ClienteController],
  providers: [ClienteService],

})
export class ClienteModule {}
