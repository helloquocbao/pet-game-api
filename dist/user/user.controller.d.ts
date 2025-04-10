import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getMe(req: any): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    } | null>;
}
