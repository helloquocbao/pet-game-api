import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { PetType, Rarity } from '@prisma/client';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  // 2.1. Random type
  private randomType(): PetType {
    const types = Object.values(PetType);
    return types[Math.floor(Math.random() * types.length)];
  }

  // 2.2. Random rarity with probabilities
  private randomRarity(): Rarity {
    const r = Math.random() * 100;
    if (r < 2) return Rarity.MYTHICAL;
    if (r < 10) return Rarity.LEGENDARY;
    if (r < 25) return Rarity.SUPER_RARE;
    if (r < 50) return Rarity.RARE;
    return Rarity.COMMON;
  }

  // 2.3. Scale stats by level
  private scaleStat(base: number, level: number): number {
    return Math.floor(base * (1 + 0.1 * (level - 1)));
  }

  // 2.4. Create a random pet
  private async createRandomPet(ownerId: number): Promise<any> {
    const type = this.randomType();
    const rarity = this.randomRarity();
    const level = 1;
    const pet = await this.prisma.pet.create({
      data: {
        name: `${type}-${Date.now()}`,
        type,
        rarity,
        level,
        hp: this.scaleStat(100, level),
        damage: this.scaleStat(10, level),
        luck: this.scaleStat(5, level),
        stamina: this.scaleStat(100, level),
        ownerId,
      },
    });
    return pet;
  }

  // 2.5. Claim first pet (free, one-time)
  async claimFirstPet(userId: number) {
    const existing = await this.prisma.pet.findFirst({ where: { ownerId: userId } });
    if (existing) throw new HttpException('Đã nhận thú rồi', HttpStatus.BAD_REQUEST);
    return this.createRandomPet(userId);
  }

  // 2.6. Buy pet (tốn coin)
  async buyPet(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const cost = 50;
    if (!user || user.coin < cost) throw new HttpException('Không đủ xu', HttpStatus.BAD_REQUEST);
    await this.prisma.user.update({ where: { id: userId }, data: { coin: { decrement: cost } } });
    return this.createRandomPet(userId);
  }

  // 2.7. List pets
  async getPetsByUser(userId: number) {
    return this.prisma.pet.findMany({ where: { ownerId: userId } });
  }
}
