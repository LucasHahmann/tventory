import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateBuildingDto {
  @IsString()
  @IsNotEmpty()
  Name: string;
}
