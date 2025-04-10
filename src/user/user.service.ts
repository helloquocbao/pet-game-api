// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, createdAt: true }, // tránh trả password
    });
    return user;
  }
}
