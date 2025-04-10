import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
export declare class PetController {
    private readonly petService;
    constructor(petService: PetService);
    adopt(req: any, dto: CreatePetDto): Promise<{
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
    myPets(req: any): Promise<({
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
