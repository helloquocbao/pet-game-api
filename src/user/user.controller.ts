// src/user/user.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { errorResponse, successResponse } from '@app/common/helpers/response.helper';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    try {
      const user = this.userService.getUserById(req.user.userId);

      return successResponse(user, 'User fetched successfully');
    } catch (err) {
      return errorResponse('Failed to fetch user', 500, err.message);
    }
  }
}
