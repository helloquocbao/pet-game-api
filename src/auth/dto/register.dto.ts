import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Địa chỉ email của người dùng',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng (ít nhất 6 ký tự)',
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
