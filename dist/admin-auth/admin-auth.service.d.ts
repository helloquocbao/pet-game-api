import { PrismaService } from '../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthDto } from './dto/admin-auth.dto';
export declare class AdminAuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: AdminAuthDto): Promise<{
        id: number;
        email: string;
    }>;
    login(dto: AdminAuthDto): Promise<{
        access_token: string;
    }>;
}
