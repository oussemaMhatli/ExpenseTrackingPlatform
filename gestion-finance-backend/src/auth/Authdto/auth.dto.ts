/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthDto {

   

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be between 3 and 20 characters' })
  public password: string;

//   @IsNotEmpty()
//   @IsString()
//   public firstName: string;
//   @IsNotEmpty()
//   @IsString()
//   public lastName: string;
}
