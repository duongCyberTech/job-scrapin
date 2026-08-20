import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'target',
      passwordField: 'password'
    });
  }

  async validate(target: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({target: target, password});
    console.log('Validated user:', user);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}