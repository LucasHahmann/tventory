import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  Model: string;

  @IsString()
  @IsNotEmpty()
  Manufactor: string;

  @IsString()
  @IsNotEmpty()
  AssetType: string;
}
