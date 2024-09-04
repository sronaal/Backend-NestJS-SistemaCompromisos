import { PartialType } from '@nestjs/mapped-types';
import { CreateObservacioneDto } from './create-observacione.dto';
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateObservacioneDto extends PartialType(CreateObservacioneDto) {



    
    @ApiProperty()
    @IsString()
    observacion?: string;

    @ApiProperty()
    @IsInt()
    proyectoId?: number;

    @ApiProperty()
    @IsInt()
    usuarioId?: number;
}
