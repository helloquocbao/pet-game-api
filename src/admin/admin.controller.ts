// src/admin/admin.controller.ts
import { Controller, Get, Delete, Param, UseGuards, Body, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAdminGuard } from '../admin-auth/jwt-admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddCoinDto } from './dto/add-coin.dto';

@Controller('admin')
@UseGuards(JwtAdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('GetAllUsers')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('GetAllPets')
  getAllPets() {
    return this.adminService.getAllPets();
  }

  @Delete('User/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(+id);
  }

  @Delete('Pet/:id')
  deletePet(@Param('id') id: string) {
    return this.adminService.deletePet(+id);
  }

  // Endpoint cộng xu cho user theo id
  @Post('AddCoinForUser')
  @ApiOperation({ summary: 'Cộng xu cho user (dành cho admin)' })
  @ApiResponse({ status: 200, description: 'Cộng xu thành công' })
  @ApiResponse({ status: 404, description: 'User không tồn tại' })
  async addCoinForUser(@Body() dto: AddCoinDto) {
    return this.adminService.addCoinToUser(dto.userId, dto.coin);
  }
}
