import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  // ---------------- Gacha / Eggs ----------------

  async getAllEggs(userId: number) {
    return await this.prisma.egg.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async gacha(userId: number, type?: string) {
    return await this.prisma.egg.create({
      data: {
        ownerId: userId,
        type: type || 'common',
        hatched: false,
      },
    });
  }

  async hatchEgg(eggId: number) {
    const egg = await this.prisma.egg.findUnique({ where: { id: eggId } });
    if (!egg || egg.hatched)
      throw new Error('Egg not found or already hatched');
    await this.prisma.egg.update({
      where: { id: eggId },
      data: { hatched: true },
    });
    return await this.prisma.pet.create({
      data: {
        ownerId: egg.ownerId,
        type: egg.type,
        level: 1,
        stage: 1,
        exp: 0,
        expToLevelUp: 100,
      },
    });
  }

  // ---------------- Pet ----------------

  async getPet(petId: number) {
    return await this.prisma.pet.findUnique({ where: { id: petId } });
  }

  async feedPet(petId: number, itemId: number, quantity: number) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!pet || !item) throw new Error('Pet or Item not found');
    let totalExp = (item.exp || 0) * quantity;
    let exp = (pet.exp || 0) + totalExp;
    let level = pet.level;
    let expToLevelUp = pet.expToLevelUp;
    while (exp >= expToLevelUp) {
      exp -= expToLevelUp;
      level += 1;
      expToLevelUp = 100 + (level - 1) * 20;
      if (level > 45) {
        level = 45;
        exp = 0;
        break;
      }
    }
    const stage = Math.floor((level - 1) / 10) + 1;
    return await this.prisma.pet.update({
      where: { id: petId },
      data: { exp, level, expToLevelUp, stage },
    });
  }

  async evolvePet(petId: number) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) throw new Error('Pet not found');
    if (pet.level < pet.stage * 10)
      throw new Error('Not enough level to evolve');
    return await this.prisma.pet.update({
      where: { id: petId },
      data: { stage: pet.stage + 1 },
    });
  }

  async getUserPets(userId: number) {
    return await this.prisma.pet.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ---------------- Items ----------------

  async getAllItems() {
    return await this.prisma.item.findMany();
  }

  async getUserItems(userId: number) {
    return await this.prisma.userItem.findMany({
      where: { userId },
      include: { item: true },
    });
  }
}
