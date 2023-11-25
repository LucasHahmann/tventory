import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class CreateAssetDto {
  @IsNumber()
  @IsNotEmpty()
  Employee: number;

  @IsString()
  @IsNotEmpty()
  ModelName: string;
}
