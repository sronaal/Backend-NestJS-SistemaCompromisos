import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import * as hash from 'md5'
import { AuthService } from './auth.service';
import { AuthLogin } from './dto/auth-login.dto';
import { AuthSucessDTO } from './interface/auth-sucess.interface';
import { JWTPayload } from './interface/jwt-payload.interface';
import { AuthGoogle } from './dto/auth-google.dto';
import { TokenGoogle } from './interface/token-google.interface';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  
 
  /***
   * @Controlador Para realizar inicio de sesion de usuarios, realiza validacion de existencia del usuario
   * a traves del correo si no existe envia como respuesta al cliente un codigo de estado 403, si existe 
   * realiza una comprobación de la contraseña si no es valida, retorna al cliente un codigo de estado 403
   * si es valida la contraseña genera un token de acceso y se lo envia al cliente con un codigo de estado 202
   */
  
  @ApiOperation(

    {
      summary: 'endpoint inicio de sesión',
      description: 'Inicio de sesión usuarios correo  y contraseña',

    })
  @Post('login')
  async iniciarSesionEmailPassword(@Body() authLogiDto: AuthLogin) {


    try {

      const usuarioAuth = await this.authService.validarSiCorreoExiste(authLogiDto.correo)
      if (!usuarioAuth) return new HttpException('Credenciales invalidas', HttpStatus.FORBIDDEN)

      const passwordHash = hash(authLogiDto.password)
      if (passwordHash != usuarioAuth.password) return new HttpException('Credenciales invalidas', HttpStatus.FORBIDDEN)


      const data: JWTPayload = {
        idUser: String(usuarioAuth.id),
        correo: usuarioAuth.correo,
        rol: usuarioAuth.rol.rol
      }

      const token = await this.authService.generarJWTAuth(data)

      const respuesta: AuthSucessDTO = {
        mensaje: "Autenticación exitosa",
        IdUsuario: data.idUser,
        rol: String(usuarioAuth.rol.id),
        token: token,
      }
      return new HttpException(respuesta, HttpStatus.ACCEPTED)

    } catch (error) {

      return new HttpException(error, HttpStatus.BAD_REQUEST)
    }


  }


  
  /** 
   * @Contraldor para realizar inicio de sesión con cuenta corporativa 
   * recibe el jsonwebtoken generado por cliente al iniciar sesion con google,
   * se realiza decodificacion del token para obtener el id de la cuenta de GSuite del usuario
   * y el correo que se encuentra con el token, se realiza validacion de existencia del correo, si existe 
   * agrega el id de GSuite  en el campo id_google de la entidad Usuario y genera jsonwebtoken con datos
   * que venia en el jsonwebtoken y lo envia al cliente, de lo contratario envia codigo 403 al cliente
   * */
  @ApiOperation({
    summary: 'endpoint para realizar inicio de sesion con cuenta de google',
    description: 'Inicio de sesión a traves de cuenta de google, recibe jsonwebtoken que genera al cliente al iniciar sesion con Google'
  }
  )
  @Post('login/google')
  async iniciarSesionGoogle(@Body() authGoogle: AuthGoogle) {

    try {

      console.log(authGoogle)
      const data_token: TokenGoogle = await this.authService.decodificarToken(authGoogle.token_google)

      
      let usuario = await this.authService.validarSiCorreoExiste(data_token.email)

      if (!usuario) return new HttpException('Token de sesión invalido', HttpStatus.FORBIDDEN)

      let userIdGoogle = await this.authService.agregarIdGoogle(usuario, data_token)


      const data: JWTPayload = {
        idUser: userIdGoogle.id_google,
        correo: userIdGoogle.correo,
        rol: String(userIdGoogle.rol.id),
      }

      const token = await this.authService.generarJWTAuth(data)
      const respuesta: AuthSucessDTO = {
        IdUsuario: userIdGoogle.id_google,
        token: token,
        correo: userIdGoogle.correo,
        mensaje: 'Autenticación Exitosa',
        rol: String(userIdGoogle.rol.id),
      }

      return new HttpException(respuesta, HttpStatus.ACCEPTED)

    } catch (error) {

      return new HttpException(`Error de autenticacion ${error}`, HttpStatus.BAD_REQUEST)
    }


  }

  























}
