import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsOptional, IsInt} from 'class-validator'

export class CreateObservacioneDto {

    @ApiProperty()
    @IsString()
    observacion: string

    @ApiProperty()
    @IsInt()
    usuarioId: number

    @ApiProperty()
    @IsInt()
    proyectoId: number
}
