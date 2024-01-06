import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  image?: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  isWorker: boolean;
}
