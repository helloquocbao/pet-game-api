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
const prisma_service_1 = require("../common/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PetService = class PetService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPetsByUser(userId) {
        return this.prisma.pet.findMany({
            where: { ownerId: userId },
            include: {
                owner: true,
            },
        });
    }
    async claimFirstPet(userId) {
        const existingPets = await this.prisma.pet.findFirst({
            where: { ownerId: userId },
        });
        if (existingPets) {
            throw new common_1.HttpException('Bạn đã nhận thú rồi!', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.createRandomPet(userId);
    }
    async buyPet(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.HttpException('Người dùng không tồn tại', common_1.HttpStatus.NOT_FOUND);
        }
        const petPrice = 10;
        if (user.coin < petPrice) {
            throw new common_1.HttpException('Không đủ xu để mua thú', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                coin: user.coin - petPrice,
            },
        });
        return this.createRandomPet(userId);
    }
    async createRandomPet(userId) {
        const type = this.randomPetType();
        const rarity = this.randomRarity();
        const pet = await this.prisma.pet.create({
            data: {
                name: this.generatePetName(type),
                type,
                rarity,
                hp: 100,
                damage: 10,
                luck: 5,
                stamina: 100,
                ownerId: userId,
            },
        });
        return pet;
    }
    randomPetType() {
        const types = Object.values(client_1.PetType);
        return types[Math.floor(Math.random() * types.length)];
    }
    randomRarity() {
        const rand = Math.random() * 100;
        if (rand < 2)
            return client_1.Rarity.MYTHICAL;
        if (rand < 10)
            return client_1.Rarity.LEGENDARY;
        if (rand < 25)
            return client_1.Rarity.SUPER_RARE;
        if (rand < 50)
            return client_1.Rarity.RARE;
        return client_1.Rarity.COMMON;
    }
    generatePetName(type) {
        const baseNames = {
            BAY: 'Rồng',
            BO_SAT: 'Rắn',
            THU: 'Hổ',
        };
        return `${baseNames[type]} #${Math.floor(Math.random() * 1000)}`;
    }
};
exports.PetService = PetService;
exports.PetService = PetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PetService);
//# sourceMappingURL=pet.service.js.map