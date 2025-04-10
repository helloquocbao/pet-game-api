// src/admin-auth/dto/admin-auth.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AdminAuthDto {
  @ApiProperty({
    description: 'Địa chỉ email của admin',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng (ít nhất 6 ký tự)',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
