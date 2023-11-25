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
import { AssetTypeService } from './asset-type.service';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';

@Controller('asset-type')
export class AssetTypeController {
  constructor(private readonly assetTypeService: AssetTypeService) {}

  @Post()
  create(@Body() createAssetTypeDto: CreateAssetTypeDto, @Res() res: Response) {
    return this.assetTypeService.create(createAssetTypeDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.assetTypeService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.assetTypeService.findOne(+id, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssetTypeDto: UpdateAssetTypeDto,
    @Res() res: Response,
  ) {
    return this.assetTypeService.update(+id, updateAssetTypeDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.assetTypeService.remove(+id, res);
  }
}
