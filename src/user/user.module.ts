// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../common/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
