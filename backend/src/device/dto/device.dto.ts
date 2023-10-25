import { IsString } from 'class-validator';

export class DeviceDto {
  @IsString()
  name: string;
}
