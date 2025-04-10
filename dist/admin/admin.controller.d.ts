import { AdminService } from './admin.service';
import { AddCoinDto } from './dto/add-coin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
        type: import(".prisma/client").$Enums.PetType;
        rarity: import(".prisma/client").$Enums.Rarity;
        hp: number;
        damage: number;
        luck: number;
        stamina: number;
        ownerId: number;
    })[]>;
    deleteUser(id: string): Promise<{
        id: number;
        email: string;
        password: string;
        createdAt: Date;
        coin: number;
    }>;
    deletePet(id: string): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        type: import(".prisma/client").$Enums.PetType;
        rarity: import(".prisma/client").$Enums.Rarity;
        hp: number;
        damage: number;
        luck: number;
        stamina: number;
        ownerId: number;
    }>;
    addCoinForUser(dto: AddCoinDto): Promise<{
        message: string;
        updatedUser: {
            id: number;
            email: string;
            password: string;
            createdAt: Date;
            coin: number;
        };
    }>;
}
