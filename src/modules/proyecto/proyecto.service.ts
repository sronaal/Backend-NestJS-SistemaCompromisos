import { HttpException, HttpStatus, Injectable, HttpExceptionBody } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cliente } from '../cliente/entities/cliente.entity';


@Injectable()
export class ProyectoService {

  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepositorio: Repository<Proyecto>,
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,
    @InjectRepository(Cliente)
    private clienteRepositorio: Repository<Cliente>
  ) { }



  async create(createProyectoDto: CreateProyectoDto) {


    try {
      const usuarioFind = await this.usuarioRepositorio.findOne({ where: { id: createProyectoDto.reponsableId } })
      if (!usuarioFind) return new HttpException(`El usuario con el id ${createProyectoDto.reponsableId} no existe`, HttpStatus.NOT_FOUND)

      const clienteFind = await this.clienteRepositorio.findOne({ where: { id: createProyectoDto.clienteId } })
      if (!clienteFind) return new HttpException(`El cliente con el id ${createProyectoDto.clienteId} no existe`, HttpStatus.NOT_FOUND)




      const proyecto = this.proyectoRepositorio.create({
        nombre: createProyectoDto.nombre,
        descripcion: createProyectoDto.descripcion,
        contenido: createProyectoDto.contenido,
        estado: createProyectoDto.estado,
        prioridad: createProyectoDto.prioridad,
        porcentaje: createProyectoDto.porcentaje,
        origen: createProyectoDto.origen,
        cliente: clienteFind,
        responsable: usuarioFind
      })
      console.log(proyecto)
      await this.proyectoRepositorio.save(proyecto)
      return new HttpException('El proyecto se ha creado correctamente', HttpStatus.CREATED)
    } catch (error: any) {

      return new HttpException(`No se ha podido crear el proyecto ${error}`, HttpStatus.BAD_REQUEST)
    }

  }

  async findAll() {


    let proyectos = await this.proyectoRepositorio.find({

      select: {
        id: true,
        nombre: true,
        descripcion: true,
        contenido: true,
        estado: true,
        prioridad: true,
        InicioProyecto: true,
        FinProyecto: true,
        porcentaje: true,
        origen: true,
        cliente: {
          empresa: true
        },
        responsable: {
          id: true,
          nombre_completo: true,
          usuario: true
        },
        observaciones: {
          observacion: true,
          fecha: true,
          usuario: {
            id: true,
            nombre_completo: true,
            usuario: true
          }
        }
      },
      relations: {
        cliente: true,
        responsable: true,
        observaciones: {

          usuario: true
        }

      }
    })

    proyectos.forEach(proyecto => {

      let InicioProyecto = proyecto.InicioProyecto?.toISOString()
      let FinProyecto = proyecto.FinProyecto?.toISOString()
      proyecto.fechaInicio = InicioProyecto
      proyecto.fechaFin = FinProyecto



    })

    return proyectos
  }


  findOne(id: number) {

    return this.proyectoRepositorio.find({
      where: { id: id },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        contenido: true,
        estado: true,
        prioridad: true,
        InicioProyecto: true,
        FinProyecto: true,
        porcentaje: true,
        origen: true,
        cliente: {
          empresa: true
        },
        responsable: {
          id: true,
          nombre_completo: true,
          usuario: true
        },
        observaciones: {
          observacion: true,
          fecha: true,
          usuario: {
            id: true,
            nombre_completo: true,
            usuario: true
          }
        }
      },
      relations: {
        cliente: true,
        responsable: true,
        observaciones: {

          usuario: true
        }

      }
    })
  }

  async findProyectoEstado(estado: string) {

    let proyectos = await this.findAll()
    let proyectosEstado = proyectos.filter(proyecto => proyecto.estado === estado)

    return proyectosEstado



    /*
    return this.proyectoRepositorio.find({
      where: { estado: estado },
      select:{
        id:true,
        nombre:true,
        descripcion:true,
        contenido:true,
        estado:true,
        prioridad:true,
        InicioProyecto:true,
        FinProyecto:true,
        porcentaje:true,
        origen:true,
        cliente:{
          empresa:true
        },
        responsable:{
          id:true,
          nombre_completo:true,
          usuario:true
        },
        observaciones:{
          observacion:true,
          fecha:true,
          usuario:{
            id:true,
            nombre_completo:true,
            usuario:true
          }
        }
      },
      relations: {
        cliente: true,
        responsable: true,
        observaciones:{
          usuario:true
        }
        
      }
    })
*/
  }


  async proyectosRecientes() {

    let proyectos = await this.proyectoRepositorio.query('SELECT * FROM suite_netcom.obtenerproyectosrecientes;')

    return proyectos



  }


  async update(id: number, updateProyectoDto: UpdateProyectoDto) {

    let updateProyecto = await this.proyectoRepositorio.findOne({ where: { id: id } })

    if (!updateProyecto) return new HttpException('El proyecto que quiere editar no existe', HttpStatus.NOT_FOUND)


    let responsable: Usuario;
    let cliente: Cliente;

    if (updateProyectoDto.reponsableId) {
      responsable = await this.usuarioRepositorio.findOne({ where: { id: updateProyectoDto.reponsableId } })
    }

    if (!responsable) return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)

    if (updateProyectoDto.clienteId) {
      cliente = await this.clienteRepositorio.findOne({ where: { id: updateProyectoDto.clienteId } })

    }

    if (!cliente) return new HttpException('El cliente no existe', HttpStatus.NOT_FOUND)


    await this.proyectoRepositorio.save({
      ...updateProyecto,
      ...updateProyectoDto,
      cliente,
      responsable
    })

    return new HttpException('El proyecto se ha actualizado correctamente', HttpStatus.GONE)
  }

  async remove(id: number) {

    return await this.proyectoRepositorio.softDelete(id)

  }


}
