import { 
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @ApiBody({ type: CreateUserDto })
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
