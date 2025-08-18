import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { GachaDto } from './dto/gacha.dto';
import { FeedPetDto } from './dto/feed-pet.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // ---------------- Gacha / Eggs ----------------
  @Get('eggs')
  async getAllEggs(@Query('userId') userId: string) {
    const eggs = await this.gameService.getAllEggs(Number(userId));
    return { status: 'success', message: 'List of eggs', data: eggs };
  }

  @Post('gacha')
  async gacha(@Body() body: GachaDto) {
    const egg = await this.gameService.gacha(body.userId, body.type);
    return { status: 'success', message: 'Gacha success', data: egg };
  }

  @Post('eggs/:id/hatch')
  async hatchEgg(@Param('id') eggId: string) {
    const pet = await this.gameService.hatchEgg(Number(eggId));
    return { status: 'success', message: 'Egg hatched', data: pet };
  }

  // ---------------- Pet ----------------
  @Get('pets/:id')
  async getPet(@Param('id') petId: string) {
    const pet = await this.gameService.getPet(Number(petId));
    return { status: 'success', message: 'Pet info', data: pet };
  }

  @Get('pets')
  async getUserPets(@Query('userId') userId: string) {
    const pets = await this.gameService.getUserPets(Number(userId));
    return { status: 'success', message: 'List of pets', data: pets };
  }

  @Post('pets/feed')
  async feedPet(@Body() body: FeedPetDto) {
    const pet = await this.gameService.feedPet(
      body.petId,
      body.itemId,
      body.quantity,
    );
    return { status: 'success', message: 'Pet fed', data: pet };
  }

  @Post('pets/evolve')
  async evolvePet(@Body() body: { petId: number }) {
    const pet = await this.gameService.evolvePet(body.petId);
    return { status: 'success', message: 'Pet evolved', data: pet };
  }

  // ---------------- Items ----------------
  @Get('items')
  async getAllItems() {
    const items = await this.gameService.getAllItems();
    return { status: 'success', message: 'List of items', data: items };
  }

  @Get('user-items')
  async getUserItems(@Query('userId') userId: string) {
    const userItems = await this.gameService.getUserItems(Number(userId));
    return { status: 'success', message: 'User items', data: userItems };
  }

  // ---------------- Battle ----------------
  // @Post('battle')
  // async battle(@Body() body: BattleDto) {
  //   const winner = await this.gameService.battle(body.pet1Id, body.pet2Id);
  //   return { status: 'success', message: 'Battle finished', data: winner };
  // }

  // @Get('battle-logs')
  // async battleLogs(@Query('userId') userId: string) {
  //   const logs = await this.gameService.getBattleLogs(Number(userId));
  //   return { status: 'success', message: 'Battle logs', data: logs };
  // }
}
