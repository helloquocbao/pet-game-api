import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { User } from './entities/user.entity';
import { Pet } from './entities/pet.entity';
import { Egg } from './entities/egg.entity';
import { Item } from './entities/item.entity';
import { UserItem } from './entities/user-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet, Egg, Item, UserItem])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
