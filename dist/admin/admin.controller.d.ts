import { AdminService } from './admin.service';
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
        species: string;
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
    }>;
    deletePet(id: string): Promise<{
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
