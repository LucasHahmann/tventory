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
import { ConfigurationService } from './configuration.service';
import { UpdateInventoryPrefix } from './dto/update-inventoryprefix.dto';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('inventoryprefix')
  getInventoryPrefix(configurationService, @Res() res: Response) {
    return this.configurationService.getInventoryPrefix(res);
  }

  @Patch('inventoryprefix')
  setInventoryPrefix(
    @Body()
    UpdateInventoryPrefix: UpdateInventoryPrefix,
    @Res() res: Response,
  ) {
    return this.configurationService.setInventoryPrefix(
      UpdateInventoryPrefix,
      res,
    );
  }
}
