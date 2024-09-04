import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  CrearCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  ObtenerClientes() {
    return this.clienteService.findAll();
  }

  @Get(':id_cliente/proyectos')
  ObtenerProyectosPorCliente(@Param('id_cliente',ParseIntPipe) idCliente : number){

    return this.clienteService.obtenerProyectosPorCliente(idCliente);
  }

  @Get(':id_cliente/compromisos')
  ObtenerCompromisosPorCliente(@Param('id_cliente', ParseIntPipe) idCliente: number){

    return this.clienteService.obtenerCompromisosPorCliente(idCliente);
  }

  
  @Get(':id')
  ObtenerCliente(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  ActualizarCliente(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  EliminarCliente(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
