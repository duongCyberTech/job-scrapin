import { 
  Controller, Post, Body, UnauthorizedException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() data: LoginDto) {
    const validatedUser = await this.authService.validateUser(data);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(validatedUser);
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @ApiBody({ type: CreateUserDto })
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
