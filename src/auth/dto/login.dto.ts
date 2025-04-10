import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Địa chỉ email của người dùng',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}
