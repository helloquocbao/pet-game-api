import { PrismaService } from '../common/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserById(id: number): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    } | null>;
}
