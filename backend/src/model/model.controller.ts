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
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() createModelDto: CreateModelDto, @Res() res: Response) {
    return this.modelService.create(createModelDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.modelService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.modelService.findOne(+id, res);
  }

  @Get('/manufactor/:manufactor')
  getAllByManufactor(
    @Param('manufactor') manufactor: string,
    @Res() res: Response,
  ) {
    return this.modelService.getAllByManufactor(manufactor, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModelDto: UpdateModelDto,
    @Res() res: Response,
  ) {
    return this.modelService.update(+id, updateModelDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.modelService.remove(+id, res);
  }
}
