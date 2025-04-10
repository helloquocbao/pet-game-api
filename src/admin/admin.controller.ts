// src/admin/admin.controller.ts
import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAdminGuard } from '../admin-auth/jwt-admin.guard';

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
}
