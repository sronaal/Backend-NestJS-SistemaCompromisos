import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>
  ) {

  }

  async create(createUsuarioDto: CreateUsuarioDto) {

    let usuario = this.usuarioRepositorio.create({
      correo: createUsuarioDto.correo,
      password: createUsuarioDto.password,
      nombre_completo: createUsuarioDto.nombre_completo,
      usuario: createUsuarioDto.usuario
    })

    console.log(usuario)
    return await this.usuarioRepositorio.save(usuario)

  }

  async findUser(id: number) {

    let userFind = await this.usuarioRepositorio.findOne({ where: { id: id } })

    if (!userFind) return new HttpException(`El usuario con el id ${id} no se existe`, HttpStatus.NOT_FOUND)

    return userFind
  }

  async findAll() {

    return await this.usuarioRepositorio.find({
      select: {
        id: true,
        id_google: true,
        nombre_completo: true,
        usuario: true,
        correo: true,

      },
      relations: {
        rol: true,
        proyectosAsignados: true
      }
    })
  }


  findEmail(correo: string) {
    let usuario = this.usuarioRepositorio.find({
      where: { correo: correo }
    })

    if (!usuario) return new HttpException('El correo electronico es invalido', HttpStatus.FORBIDDEN)

    return usuario
  }

  findOne(id: number) {

    return this.usuarioRepositorio.find({
      where:{id:id},
      select: {
        id: true,
        id_google: true,
        nombre_completo: true,
        usuario: true,
        correo: true,
      },
      relations: {
        rol: true,
        proyectosAsignados: true
      }

    })
  }

  async findProyectosAsignados(id: number) {

  

    let usuarioData = await this.usuarioRepositorio.findOne({
      where: { id: id },

      select:{
        id:true,
        nombre_completo:true,
        usuario:true,
      },
      relations: {
        proyectosAsignados: true,
      }
    })

    return usuarioData


  }

  async findCompromisosAsignados(id: number){

    
    let compromisosAsignados = await this.usuarioRepositorio.findOne({

      where:{id:id},
      
      select:{
        id:true,
        nombre_completo:true,
        usuario:true,
      },
      relations:{
        compromisos:true
      }
    })

    return compromisosAsignados

   
   
   
   
   
   
   
   
   
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    
  }

 
 
 
}
