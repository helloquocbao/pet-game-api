import { PrismaService } from '@app/common/prisma.service';
export declare class PetService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getPetsByUser(userId: number): Promise<({
        owner: {
            id: number;
            createdAt: Date;
            email: string;
            password: string;
            coin: number;
        };
    } & {
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.PetType;
        rarity: import(".prisma/client").$Enums.Rarity;
        hp: number;
        damage: number;
        luck: number;
        stamina: number;
        ownerId: number;
        createdAt: Date;
    })[]>;
    claimFirstPet(userId: number): Promise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.PetType;
        rarity: import(".prisma/client").$Enums.Rarity;
        hp: number;
        damage: number;
        luck: number;
        stamina: number;
        ownerId: number;
        createdAt: Date;
    }>;
    buyPet(userId: number): Promise<{
        id: number;
        name: string;
        type: import(".prisma/client").$Enums.PetType;
        rarity: import(".prisma/client").$Enums.Rarity;
        hp: number;
        damage: number;
        luck: number;
        stamina: number;
        ownerId: number;
        createdAt: Date;
    }>;
    private createRandomPet;
    private randomPetType;
    private randomRarity;
    private generatePetName;
}
