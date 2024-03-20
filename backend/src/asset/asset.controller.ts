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
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto, @Res() res: Response) {
    return this.assetService.create(createAssetDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.assetService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.assetService.findOne(+id, res);
  }

  @Get(':InventoryNumber')
  findByInventoryNumber(
    @Param('InventoryNumber') InventoryNumber: string,
    @Res() res: Response,
  ) {
    return this.assetService.findByInventoryNumber(InventoryNumber, res);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Res() res: Response,
  ) {
    return this.assetService.update(+id, updateAssetDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.assetService.remove(+id, res);
  }
}
