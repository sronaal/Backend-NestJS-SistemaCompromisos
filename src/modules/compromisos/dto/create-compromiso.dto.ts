import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsInt } from "class-validator";

export class CreateCompromisoDto {

    @ApiProperty()
    @IsString()
    nombre: string

    @ApiProperty()
    @IsString()
    estado: string

    @ApiProperty()
    @IsDateString()
    fechaEntrega: Date

    @ApiProperty()
    @IsInt()    
    porcentaje: number

    @ApiProperty()
    @IsInt()
    clienteId: number

    @ApiProperty()
    @IsInt()
    responsableId: number


}
