// src/admin/admin.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, createdAt: true },
    });
  }

  async getAllPets() {
    return this.prisma.pet.findMany({
      include: { owner: { select: { id: true, email: true } } },
    });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.user.delete({ where: { id } });
  }

  async deletePet(id: number) {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet) throw new NotFoundException('Pet not found');
    return this.prisma.pet.delete({ where: { id } });
  }

  async addCoinToUser(userId: number, coin: number) {
    // Tìm user theo id
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Cập nhật số coin: dùng increment để tăng số coin hiện có của user
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { coin: { increment: coin } },
    });

    return { message: 'Cộng xu thành công', updatedUser };
  }
}
