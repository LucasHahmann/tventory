import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateInventoryPrefix {
  @IsString()
  @IsNotEmpty()
  InventoryPrefix: string;
}
