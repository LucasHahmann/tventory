import { PartialType } from '@nestjs/mapped-types';
import { CreateManufactorDto } from './create-manufactor.dto';

export class UpdateManufactorDto extends PartialType(CreateManufactorDto) {}
