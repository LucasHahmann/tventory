import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateManufactorDto {
  @IsString()
  @IsNotEmpty()
  Name: string;
}
