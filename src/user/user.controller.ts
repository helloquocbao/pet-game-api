// src/user/user.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return this.userService.getUserById(req.user.userId);
  }
}
