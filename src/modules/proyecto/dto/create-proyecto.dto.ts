import { ApiProperty } from '@nestjs/swagger'
import {IsInt, IsOptional , IsString, IsDate, IsNotEmpty} from 'class-validator'

export class CreateProyectoDto {

    @ApiProperty()
    @IsNotEmpty({message:'El nombre del proyecto es obligatorio'})
    @IsString()
    nombre: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'La descripción es obligatoria'})
    descripcion: string

    @ApiProperty()
    @IsOptional()  
    @IsString()
    contenido?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    estado?: string

    @ApiProperty()
    @IsNotEmpty({message:'Agregue una prioridad al proyecto'})
    @IsString()
    prioridad: string


    @ApiProperty()
    @IsString()
    origen: string


    @ApiProperty()
    @IsInt()
    porcentaje?: number

    @ApiProperty()
    @IsNotEmpty({message:'No puede crear un proyecto sin asignarlo a un técnico'})
    @IsInt()
    reponsableId: number

    @ApiProperty()
    @IsNotEmpty({message:'No puede crear un proyecto sin  asignarlo a una cliente'})
    @IsInt()
    clienteId: number
    
    

}
