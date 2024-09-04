import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompromisoDto } from './dto/create-compromiso.dto';
import { UpdateCompromisoDto } from './dto/update-compromiso.dto';
import { Compromiso } from './entities/compromiso.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';

@Injectable()
export class CompromisosService {

  constructor(
    @InjectRepository(Compromiso)
    private repositorioCompromiso : Repository<Compromiso>,
    @InjectRepository(Usuario)
    private repositorioUsuario: Repository<Usuario>,
    @InjectRepository(Cliente)
    private repositorioCliente: Repository<Cliente>
  ){
    
  }

  async create(createCompromisoDto: CreateCompromisoDto) {
    

    try {

      const usuarioFind = await this.repositorioUsuario.findOne({where:{id:createCompromisoDto.responsableId}})

      if (!usuarioFind) return new HttpException(`El usuario con el id ${createCompromisoDto.responsableId} no existe`, HttpStatus.NOT_FOUND)
    
      const clienteFind = await this.repositorioCliente.findOne({where:{id:createCompromisoDto.clienteId}})
      if (!clienteFind) return new HttpException(`El cliente con el id ${createCompromisoDto.clienteId} no existe`, HttpStatus.NOT_FOUND)

     
      let compromisoSave =  this.repositorioCompromiso.create({
        nombre:createCompromisoDto.nombre,
        estado: createCompromisoDto.estado,
        fechaEntrega: createCompromisoDto.fechaEntrega,
        responsable: usuarioFind,
        porcentaje:createCompromisoDto.porcentaje,
        cliente: clienteFind


      })

      
      this.repositorioCompromiso.save(compromisoSave)
      return new HttpException('Se ha creado el compromiso', HttpStatus.CREATED)
    } catch (error) {

      return new HttpException('Ha ocurrido un error', HttpStatus.BAD_REQUEST)
    }

  }

  findAll() {
    return this.repositorioCompromiso.find(
      { select:{
          nombre:true,
          estado:true,
          fechaCreacion:true,
          fechaEntrega:true,
          porcentaje:true,
          cliente:{
            empresa:true
        },
          responsable:{
            id:true,
            nombre_completo:true,
            correo:true
        }
      },

        relations:{
          cliente:true,
          responsable:true
        }
      }
    )
  }

  findOne(id: number) {
      return this.repositorioCompromiso.find(
      { 
        where:{id:id},
        select:{
          nombre:true,
          estado:true,
          fechaCreacion:true,
          fechaEntrega:true,
          porcentaje:true,
          cliente:{
            empresa:true
        },
          responsable:{
            id:true,
            nombre_completo:true,
            correo:true
        }
      },
        relations:{
          cliente:true,
          responsable:true
        }
      }
    )
  }

  update(id: number, updateCompromisoDto: UpdateCompromisoDto) {
    return `This action updates a #${id} compromiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} compromiso`;
  }
}
