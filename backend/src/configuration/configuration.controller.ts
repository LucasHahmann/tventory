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
import { ConfigurationController } from './controller.service';

@Controller('employee')
export class ConfigurationController {
  constructor(
    private readonly configurationController: ConfigurationController,
  ) {}
}
