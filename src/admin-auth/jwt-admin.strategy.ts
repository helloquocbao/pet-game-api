// src/admin-auth/jwt-admin.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_jwt_secret', // ✅ đảm bảo không undefined
    });
  }

  async validate(payload: any) {
    if (!payload?.isAdmin) {
      return null;
    }

    return { adminId: payload.sub, email: payload.email, isAdmin: true };
  }
}
