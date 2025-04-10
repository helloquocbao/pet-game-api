import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const JwtAdminStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtAdminStrategy extends JwtAdminStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        adminId: any;
        email: any;
        isAdmin: boolean;
    } | null>;
}
export {};
