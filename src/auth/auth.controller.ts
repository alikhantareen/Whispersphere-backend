import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/get-user/:id')
  getUser(@Param('id') id): Promise<any> {
    return this.authService.getUser(id);
  }

  @Post('/signup')
  signUp(@Body() signupdto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(signupdto);
  }

  @Post('/login')
  login(@Body() logindto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(logindto);
  }
}
