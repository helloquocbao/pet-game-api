import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { PetService } from './pet.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('pet')
@UseGuards(JwtAuthGuard)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('AddPet')
  adopt(@Request() req, @Body() dto: CreatePetDto) {
    return this.petService.addPet(req.user.userId, dto);
  }

  @Get('GetMyPets')
  myPets(@Request() req) {
    return this.petService.getMyPets(req.user.userId);
  }
}
