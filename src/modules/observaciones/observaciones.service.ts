import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateObservacioneDto } from './dto/create-observacione.dto';
import { UpdateObservacioneDto } from './dto/update-observacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Observaciones } from './entities/observacione.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';

@Injectable()
export class ObservacionesService {

  constructor(
    @InjectRepository(Observaciones)
    private observacionRepositorio : Repository<Observaciones>,
    @InjectRepository(Usuario) 
    private usuarioRepositorio : Repository<Usuario>,
    @InjectRepository(Proyecto)
    private proyectoRepositorio : Repository<Proyecto>
    
  ){}

  async create(createObservacioneDto: CreateObservacioneDto) {
    
    try {
      
      const  usuarioFind = await this.usuarioRepositorio.findOne({where: {id:createObservacioneDto.usuarioId}})
      if(!usuarioFind) return new HttpException(`El usuario con el id ${createObservacioneDto.usuarioId} no existe`, HttpStatus.NOT_FOUND)

      const proyectoFind = await this.proyectoRepositorio.findOne({where:{id:createObservacioneDto.proyectoId}})
      if(!proyectoFind) return new HttpException(`El proyecto con el id ${createObservacioneDto.proyectoId} no existe`,HttpStatus.NOT_FOUND)
    
    
      const observacion = this.observacionRepositorio.create({
        observacion: createObservacioneDto.observacion,
        proyecto: proyectoFind,
        usuario: usuarioFind
      })
      

      await this.observacionRepositorio.save(observacion)
      return new HttpException('La observacion se ha agregado', HttpStatus.CREATED)
    
    } catch (error) {

      return new HttpException(`No se ha podido la observación ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return this.observacionRepositorio.find(

    )
  }

  findOne(id: number) {
    
    return this.observacionRepositorio.findOne({
      where:{id:id},
      select:{
        id:true,
        observacion:true,
        fecha:true,
        usuario:{
          id:true,
          nombre_completo:true,
          usuario:true
        }
      },

      relations:{
        //proyecto:true,
       usuario:true
      }
    })
  }

  async update(id: number, updateObservacioneDto: UpdateObservacioneDto) {
    
    
    let observacion = await this.observacionRepositorio.findOne({where:{id:id}})

    if(!observacion) return new HttpException(`La observacion con el id ${id} no existe`, HttpStatus.NOT_FOUND)

    return await this.observacionRepositorio.save({
      ...observacion,
      ...updateObservacioneDto
    })

    
  }

  remove(id: number) {
    return `This action removes a #${id} observacione`;
  }
}
