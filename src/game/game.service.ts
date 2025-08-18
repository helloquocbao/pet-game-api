import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Pet } from './entities/pet.entity';
import { Egg } from './entities/egg.entity';
import { Item } from './entities/item.entity';
import { UserItem } from './entities/user-item.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(Egg) private eggRepo: Repository<Egg>,
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(UserItem) private userItemRepo: Repository<UserItem>,
  ) {}

  // ---------------- Gacha / Eggs ----------------

  async getAllEggs(userId: number): Promise<Egg[]> {
    return this.eggRepo.find({
      where: { owner: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async gacha(userId: number, type?: string): Promise<Egg> {
    // logic rút trứng
    const egg = this.eggRepo.create({
      owner: { id: userId } as User,
      type: type || 'common',
      hatched: false,
    });
    return this.eggRepo.save(egg);
  }

  async hatchEgg(eggId: number): Promise<Pet> {
    const egg = await this.eggRepo.findOne({
      where: { id: eggId },
      relations: ['owner'],
    });
    if (!egg || egg.hatched)
      throw new Error('Egg not found or already hatched');

    egg.hatched = true;
    await this.eggRepo.save(egg);

    const pet = this.petRepo.create({
      owner: egg.owner,
      type: egg.type,
      level: 1,
      stage: 1,
    });
    return this.petRepo.save(pet);
  }

  // ---------------- Pet ----------------

  async getPet(petId: number): Promise<Pet> {
    const pet = await this.petRepo.findOne({
      where: { id: petId },
      relations: ['owner'],
    });
    if (!pet) throw new Error('Pet not found'); // hoặc HttpException
    return pet;
  }

  async feedPet(petId: number, itemId: number, quantity: number): Promise<Pet> {
    const pet = await this.petRepo.findOne({
      where: { id: petId },
      relations: ['owner'],
    });
    const item = await this.itemRepo.findOne({ where: { id: itemId } });
    if (!pet || !item) throw new Error('Pet or Item not found');

    // Cộng exp từ item
    const totalExp = (item.exp || 0) * quantity;
    pet.exp = (pet.exp || 0) + totalExp;

    // Lên level nếu đủ exp
    while (pet.exp >= pet.expToLevelUp) {
      pet.exp -= pet.expToLevelUp;
      pet.level += 1;
      // Tính exp cần cho level tiếp theo (ví dụ: tăng 20 mỗi level)
      pet.expToLevelUp = 100 + (pet.level - 1) * 20;
      if (pet.level > 45) {
        pet.level = 45;
        pet.exp = 0;
        break;
      }
    }

    pet.stage = Math.floor((pet.level - 1) / 10) + 1;
    return this.petRepo.save(pet);
  }
  async evolvePet(petId: number): Promise<Pet> {
    const pet = await this.petRepo.findOne({ where: { id: petId } });
    if (!pet) throw new Error('Pet not found');

    if (pet.level < pet.stage * 10)
      throw new Error('Not enough level to evolve');

    pet.stage += 1;
    return this.petRepo.save(pet);
  }

  async getUserPets(userId: number): Promise<Pet[]> {
    return this.petRepo.find({
      where: { owner: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  // ---------------- Items ----------------

  async getAllItems(): Promise<Item[]> {
    return this.itemRepo.find();
  }

  async getUserItems(userId: number): Promise<UserItem[]> {
    return this.userItemRepo.find({
      where: { user: { id: userId } },
      relations: ['item'],
    });
  }

  // ---------------- Battle (tương lai) ----------------

  // async battle(pet1Id: number, pet2Id: number): Promise<Pet> {
  //   const pet1 = await this.petRepo.findOne({ where: { id: pet1Id } });
  //   const pet2 = await this.petRepo.findOne({ where: { id: pet2Id } });
  //   if (!pet1 || !pet2) throw new Error('Pet not found');

  //   const winner = Math.random() < 0.5 ? pet1 : pet2;

  //   const log = this.battleLogRepo.create({ pet1, pet2, winnerPet: winner });
  //   await this.battleLogRepo.save(log);

  //   return winner;
  // }

  // async getBattleLogs(userId: number): Promise<BattleLog[]> {
  //   return this.battleLogRepo.find({
  //     where: [
  //       { pet1: { owner: { id: userId } } },
  //       { pet2: { owner: { id: userId } } },
  //     ],
  //     relations: ['pet1', 'pet2', 'winnerPet'],
  //     order: { createdAt: 'DESC' },
  //   });
  // }
}
