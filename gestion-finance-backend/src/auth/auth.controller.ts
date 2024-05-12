/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './Authdto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto:CreateUserDto){
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto:AuthDto){
    return this.authService.signin(dto);
  }

  @Get('signout')
  signout(){
    return this.authService.signout();
  }

}
