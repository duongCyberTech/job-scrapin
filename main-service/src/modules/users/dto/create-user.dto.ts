import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password phải có ít nhất 8 ký tự' })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password phải chứa ít nhất 1 chữ thường',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password phải chứa ít nhất 1 chữ hoa',
  })
  @Matches(/^(?=.*\d)/, {
    message: 'Password phải chứa ít nhất 1 số',
  })
  @Matches(/^(?=.*[@$!%*?&])/,
    { message: 'Password phải chứa ít nhất 1 ký tự đặc biệt (@$!%*?&)' },
  )
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

  @ApiProperty()
  @IsString()
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'Tên không hợp lệ',
  })
  middleName?: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'Tên không hợp lệ',
  })
  lastName!: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  role!: Role;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^(0|\+84)(3|5|7|8|9)+([0-9]{8})\b/, { message: 'Số điện thoại không hợp lệ' })
  phoneNumber?: string;
}
