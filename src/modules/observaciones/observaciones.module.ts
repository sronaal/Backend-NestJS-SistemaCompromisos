import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ObservacionesService } from './observaciones.service';
import { ObservacionesController } from './observaciones.controller';
import { Observaciones } from './entities/observacione.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Observaciones,Proyecto,Usuario]) ],
  controllers: [ObservacionesController],
  providers: [ObservacionesService],
})
export class ObservacionesModule {}
