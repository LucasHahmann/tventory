import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { DeviceService } from './device.service';
import { DeviceDto } from './dto';

@Controller('devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}
  @Get('get')
  getMe(@Body() dto: DeviceDto) {
    return this.deviceService.get(dto);
  }
}
