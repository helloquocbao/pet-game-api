"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let PetService = class PetService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addPet(userId, dto) {
        return this.prisma.pet.create({
            data: {
                name: dto.name,
                species: dto.species,
                ownerId: userId,
                hp: dto.hp ?? 100,
                damage: dto.damage ?? 10,
                luck: dto.luck ?? 5,
                stamina: dto.stamina ?? 100,
            },
        });
    }
    async getMyPets(userId) {
        return this.prisma.pet.findMany({
            where: { ownerId: userId },
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    }
};
exports.PetService = PetService;
exports.PetService = PetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PetService);
//# sourceMappingURL=pet.service.js.map