import { PetService } from './pet.service';
import { Request } from 'express';
export declare class PetController {
    private readonly petService;
    constructor(petService: PetService);
    getMyPets(req: Request): Promise<({
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
    claimRandomPet(req: Request): Promise<{
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
    buyPetWithCoin(req: Request): Promise<{
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
}
