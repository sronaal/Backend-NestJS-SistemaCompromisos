import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AuthGoogle{

    @ApiProperty()
    @IsOptional({message:'El token de sesión es requerido'})
    @IsString()
    token_google: string
}


 
 
 
 
 

 
 
 

