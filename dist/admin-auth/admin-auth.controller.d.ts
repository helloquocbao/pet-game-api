import { AdminAuthService } from './admin-auth.service';
import { AdminAuthDto } from './dto/admin-auth.dto';
export declare class AdminAuthController {
    private authService;
    constructor(authService: AdminAuthService);
    register(dto: AdminAuthDto): Promise<{
        id: number;
        email: string;
    }>;
    login(dto: AdminAuthDto): Promise<{
        access_token: string;
    }>;
}
