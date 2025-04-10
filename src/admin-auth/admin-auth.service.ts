// src/admin-auth/admin-auth.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminAuthDto } from './dto/admin-auth.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AdminAuthDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const admin = await this.prisma.admin.create({
      data: {
        email: dto.email,
        password: hash,
      },
    });
    return { id: admin.id, email: admin.email };
  }

  async login(dto: AdminAuthDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
      throw new ForbiddenException('Invalid credentials');
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
      isAdmin: true,
    };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
