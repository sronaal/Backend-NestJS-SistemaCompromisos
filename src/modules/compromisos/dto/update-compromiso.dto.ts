import { PartialType } from '@nestjs/mapped-types';
import { CreateCompromisoDto } from './create-compromiso.dto';

export class UpdateCompromisoDto extends PartialType(CreateCompromisoDto) {}
