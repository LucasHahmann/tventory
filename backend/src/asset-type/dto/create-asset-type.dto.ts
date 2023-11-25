import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAssetTypeDto {
  @IsString()
  @IsNotEmpty()
  Type: string;
}
