import { PrismaService } from '../common/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: number;
        email: string;
        createdAt: Date;
    }[]>;
    getAllPets(): Promise<({
        owner: {
            id: number;
            email: string;
        };
    } & {
        id: number;
        createdAt: Date;
        name: string;
        species: string;
        hp: number;
        damage: number;
        luck: number;
        stamina: number;
        ownerId: number;
    })[]>;
    deleteUser(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    deletePet(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        species: string;
        hp: number;
        damage: number;
        luck: number;
        stamina: number;
        ownerId: number;
    }>;
}
