import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './common/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminModule } from './admin/admin.module';
// Các module khác nếu có

@Module({
  imports: [
    // Load biến môi trường từ .env và dùng toàn cục
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AdminAuthModule,
    UserModule,
    AdminModule,
    PetModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
