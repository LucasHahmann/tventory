import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  Name: string;
}
