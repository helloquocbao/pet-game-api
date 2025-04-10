// src/admin-auth/admin-auth.module.ts
import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../common/prisma.module';
import { JwtAdminStrategy } from './jwt-admin.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, JwtAdminStrategy],
})
export class AdminAuthModule {}
