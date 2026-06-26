import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { User as PrismaUser } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmailOrUsername( target: string ): Promise<Partial<PrismaUser> | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: target },
          { username: target }
        ]
      },
      select: {
        uid: true,
        email: true,
        password: true,
        username: true
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
