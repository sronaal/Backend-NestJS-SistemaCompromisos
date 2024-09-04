import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLogin{


    @ApiProperty()
    @IsNotEmpty({message:"El correo electronico es obligatorio"})
    @IsEmail({})
    correo: string
    

    @ApiProperty()
    @IsNotEmpty({message:'La contraseña es obligatoria'})
    password: string

}