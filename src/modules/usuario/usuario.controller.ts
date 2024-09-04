import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return  this.usuarioService.create(createUsuarioDto)
  }


  @Get()
  ObtenerUsuarios() {
    return this.usuarioService.findAll();
  }

  

  @Get(':id')
  ObtenerUsuario(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }



  @Patch(':id')
  ActualizarUsuario(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }


  @Get(':id_user/proyectos')
  obtenerProyectosAsignados(@Param('id_user', ParseIntPipe) id: number){

    return this.usuarioService.findProyectosAsignados(id)

  }

  @Get(':id_user/compromisos')
  obtenerCompromisosAsignados(@Param('id_user', ParseIntPipe) id: number){

    return this.usuarioService.findCompromisosAsignados(id)
  }

}
