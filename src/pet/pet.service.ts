import { PrismaService } from '@app/common/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PetType, Rarity } from '@prisma/client';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  async getPetsByUser(userId: number) {
    return this.prisma.pet.findMany({
      where: { ownerId: userId },
      include: {
        owner: true, // nếu muốn trả thêm info user
      },
    });
  }

  async claimFirstPet(userId: number) {
    const existingPets = await this.prisma.pet.findFirst({
      where: { ownerId: userId },
    });

    if (existingPets) {
      throw new HttpException('Bạn đã nhận thú rồi!', HttpStatus.BAD_REQUEST);
    }

    return this.createRandomPet(userId);
  }

  async buyPet(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND);
    }

    const petPrice = 10;

    if (user.coin < petPrice) {
      throw new HttpException('Không đủ xu để mua thú', HttpStatus.BAD_REQUEST);
    }

    // Trừ xu và tạo thú
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        coin: user.coin - petPrice,
      },
    });

    return this.createRandomPet(userId);
  }

  private async createRandomPet(userId: number) {
    const type = this.randomPetType();
    const rarity = this.randomRarity();

    const pet = await this.prisma.pet.create({
      data: {
        name: this.generatePetName(type),
        type,
        rarity,
        hp: 100,
        damage: 10,
        luck: 5,
        stamina: 100,
        ownerId: userId,
      },
    });

    return pet;
  }

  private randomPetType(): PetType {
    const types = Object.values(PetType);
    return types[Math.floor(Math.random() * types.length)];
  }

  private randomRarity(): Rarity {
    const rand = Math.random() * 100;

    if (rand < 2) return Rarity.MYTHICAL;
    if (rand < 10) return Rarity.LEGENDARY;
    if (rand < 25) return Rarity.SUPER_RARE;
    if (rand < 50) return Rarity.RARE;
    return Rarity.COMMON;
  }

  private generatePetName(type: PetType): string {
    const baseNames = {
      BAY: 'Rồng',
      BO_SAT: 'Rắn',
      THU: 'Hổ',
    };

    return `${baseNames[type]} #${Math.floor(Math.random() * 1000)}`;
  }
}
