import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { PetService } from './pet.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';

@Controller('pet')
@UseGuards(JwtAuthGuard)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get('GetMyPets')
  async getMyPets(@Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.petService.getPetsByUser(userId);
  }

  @Post('ClaimPet')
  async claimRandomPet(@Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.petService.claimFirstPet(userId);
  }

  @Post('BuyPet')
  async buyPet(@Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.petService.buyPet(userId);
  }
}
