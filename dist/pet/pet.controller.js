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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetController = void 0;
const common_1 = require("@nestjs/common");
const pet_service_1 = require("./pet.service");
const jwt_guard_1 = require("../auth/jwt.guard");
let PetController = class PetController {
    petService;
    constructor(petService) {
        this.petService = petService;
    }
    async getMyPets(req) {
        const userId = req.user.userId;
        return this.petService.getPetsByUser(userId);
    }
    async claimRandomPet(req) {
        const userId = req.user.userId;
        return this.petService.claimFirstPet(userId);
    }
    async buyPetWithCoin(req) {
        const userId = req.user.userId;
        return this.petService.buyPet(userId);
    }
};
exports.PetController = PetController;
__decorate([
    (0, common_1.Get)('GetMyPets'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetController.prototype, "getMyPets", null);
__decorate([
    (0, common_1.Post)('ClaimPet'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetController.prototype, "claimRandomPet", null);
__decorate([
    (0, common_1.Post)('BuyPetWithCoin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetController.prototype, "buyPetWithCoin", null);
exports.PetController = PetController = __decorate([
    (0, common_1.Controller)('pet'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pet_service_1.PetService])
], PetController);
//# sourceMappingURL=pet.controller.js.map