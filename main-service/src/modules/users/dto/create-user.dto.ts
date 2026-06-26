import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client/edge";
import { IsEmail, IsString, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must be at least 8 characters long and contain at least one letter and one number',
  })
  password!: string;

  @ApiProperty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[\p{L}\s]+$/u, {
      message: 'Tên không hợp lệ',
  })
  firstName!: string;
  middleName?: string;
  lastName!: string;
  role!: Role;
  phoneNumber?: string;
}
