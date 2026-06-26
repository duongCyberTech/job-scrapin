import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User as PrismaUser } from '@prisma/client'
import { UsersService } from '../users/users.service';
import bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { target, password } = loginDto;
    const user: Partial<PrismaUser> | null = await this.usersService.findByEmailOrUsername(target);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password!);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async login(user: Partial<PrismaUser>) {
    const payload = { sub: user.uid };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
