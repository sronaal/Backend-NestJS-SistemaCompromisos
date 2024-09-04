import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClienteService {


  constructor(
    @InjectRepository(Cliente)
    private clienteRepositorio: Repository<Cliente>
  ) {

  }
  create(createClienteDto: CreateClienteDto) {
    return 'This action adds a new cliente';
  }

  findAll() {

    return this.clienteRepositorio.find()
  }

  async obtenerProyectosPorCliente(id: number) {

    try {
      let proyectos = await this.clienteRepositorio.findOne({
        where: { id: id },
        select: {
          id: true,
          empresa: true,
          proyectos: {
            nombre: true,
            estado: true,
            prioridad: true
          }
        },
        relations: {
          proyectos: true
        }
      })

      return proyectos
    } catch (error) {

      return new HttpException(`Ha ocurrido un error ${error}`, HttpStatus.BAD_REQUEST)
    }
  }

  async obtenerCompromisosPorCliente(id: number) {


    try {

      let compromisos = await this.clienteRepositorio.findOne({
        where: { id: id },
        select: {
          id: true,
          empresa: true,
          compromisos: {
            nombre: true,
            fechaEntrega: true,
            estado: true
          }
        },
        relations: {
          compromisos: true
        }
      })

     
      return compromisos

    } catch (error) {

      return new HttpException(`Ha ocurrido un error ${error}`, HttpStatus.BAD_REQUEST)
    }













  }

  findOne(id: number) {

    return this.clienteRepositorio.findOne({
      where: { id: id },
      relations: {
        proyectos: true
      }
    }
    )
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
