import { 
  Controller, Post, Body, UnauthorizedException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('data') data: LoginDto) {
    const validatedUser = await this.authService.validateUser(data);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(validatedUser);
  }
}
