import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async addPet(userId: number, dto: CreatePetDto) {
    return this.prisma.pet.create({
      data: {
        name: dto.name,
        species: dto.species,
        ownerId: userId,
        hp: dto.hp ?? 100,
        damage: dto.damage ?? 10,
        luck: dto.luck ?? 5,
        stamina: dto.stamina ?? 100,
      },
    });
  }

  async getMyPets(userId: number) {
    return this.prisma.pet.findMany({
      where: { ownerId: userId },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }
}
