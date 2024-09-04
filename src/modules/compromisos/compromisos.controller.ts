import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompromisosService } from './compromisos.service';
import { CreateCompromisoDto } from './dto/create-compromiso.dto';
import { UpdateCompromisoDto } from './dto/update-compromiso.dto';

@Controller('compromisos')
export class CompromisosController {
  constructor(private readonly compromisosService: CompromisosService) {}

  @Post()
  create(@Body() createCompromisoDto: CreateCompromisoDto) {
    return this.compromisosService.create(createCompromisoDto);
  }

  @Get()
  findAll() {
    return this.compromisosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compromisosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompromisoDto: UpdateCompromisoDto) {
    return this.compromisosService.update(+id, updateCompromisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compromisosService.remove(+id);
  }
}
