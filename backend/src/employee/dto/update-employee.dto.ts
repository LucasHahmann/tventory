import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  FirstName: string;

  @IsString()
  @IsNotEmpty()
  LastName: string;

  @IsEmail()
  @IsNotEmpty()
  EMail: string;

  @IsString()
  @IsNotEmpty()
  Buidling: string;
}
