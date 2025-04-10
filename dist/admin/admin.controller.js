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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const jwt_admin_guard_1 = require("../admin-auth/jwt-admin.guard");
const swagger_1 = require("@nestjs/swagger");
const add_coin_dto_1 = require("./dto/add-coin.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAllUsers() {
        return this.adminService.getAllUsers();
    }
    getAllPets() {
        return this.adminService.getAllPets();
    }
    deleteUser(id) {
        return this.adminService.deleteUser(+id);
    }
    deletePet(id) {
        return this.adminService.deletePet(+id);
    }
    async addCoinForUser(dto) {
        return this.adminService.addCoinToUser(dto.userId, dto.coin);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('GetAllUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('GetAllPets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllPets", null);
__decorate([
    (0, common_1.Delete)('User/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Delete)('Pet/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deletePet", null);
__decorate([
    (0, common_1.Post)('AddCoinForUser'),
    (0, swagger_1.ApiOperation)({ summary: 'Cộng xu cho user (dành cho admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cộng xu thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User không tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_coin_dto_1.AddCoinDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addCoinForUser", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_admin_guard_1.JwtAdminGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map