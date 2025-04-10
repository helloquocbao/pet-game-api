// src/admin-auth/admin-auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthDto } from './dto/admin-auth.dto';

@Controller('admin')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}

  @Post('register')
  register(@Body() dto: AdminAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AdminAuthDto) {
    return this.authService.login(dto);
  }
}
