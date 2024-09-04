import { ApiProperty } from "@nestjs/swagger"
import { IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class CreateUsuarioDto {



    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'El nombre es obligatorio'})
    nombre_completo:string

    @IsString()
    @IsNotEmpty({message:'El usuario es obligatorio'})
    @ApiProperty()
    usuario:string

    @IsString()
    @IsNotEmpty({message:'La contraseña es obligatoria'})
    @ApiProperty()
    password:string


    @IsNotEmpty({message:'El correo es obligatorio'})
    @ApiProperty()
    correo:string
}
