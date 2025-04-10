import { PrismaService } from '../common/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
export declare class PetService {
    private prisma;
    constructor(prisma: PrismaService);
    addPet(userId: number, dto: CreatePetDto): Promise<{
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
    getMyPets(userId: number): Promise<({
        owner: {
            email: string;
            id: number;
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
}
