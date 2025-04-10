// src/admin-auth/jwt-admin.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminGuard extends AuthGuard('admin-jwt') {}
