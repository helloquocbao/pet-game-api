// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../common/prisma.module';
import { JwtAdminStrategy } from '../admin-auth/jwt-admin.strategy';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, JwtAdminStrategy],
})
export class AdminModule {}
