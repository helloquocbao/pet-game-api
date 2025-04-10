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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AdminAuthService = class AdminAuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const hash = await bcrypt.hash(dto.password, 10);
        const admin = await this.prisma.admin.create({
            data: {
                email: dto.email,
                password: hash,
            },
        });
        return { id: admin.id, email: admin.email };
    }
    async login(dto) {
        const admin = await this.prisma.admin.findUnique({
            where: { email: dto.email },
        });
        if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const payload = {
            sub: admin.id,
            email: admin.email,
            isAdmin: true,
        };
        return {
            access_token: this.jwt.sign(payload),
        };
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map