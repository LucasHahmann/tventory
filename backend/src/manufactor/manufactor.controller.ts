import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ManufactorService } from './manufactor.service';
import { CreateManufactorDto } from './dto/create-manufactor.dto';
import { UpdateManufactorDto } from './dto/update-manufactor.dto';

@Controller('manufactor')
export class ManufactorController {
  constructor(private readonly manufactorService: ManufactorService) {}

  @Post()
  create(
    @Body() createManufactorDto: CreateManufactorDto,
    @Res() res: Response,
  ) {
    return this.manufactorService.create(createManufactorDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.manufactorService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.manufactorService.findOne(+id, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManufactorDto: UpdateManufactorDto,
    @Res() res: Response,
  ) {
    return this.manufactorService.update(+id, updateManufactorDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.manufactorService.remove(+id, res);
  }
}
