import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Phương thức đăng ký
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Kiểm tra user đã tồn tại chưa
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Tạo payload cho JWT. Bạn có thể thêm các trường khác nếu cần.
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  // Phương thức đăng nhập
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Tìm kiếm user theo email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // So sánh mật khẩu: password nhập vào so với mật khẩu đã được hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Tạo JWT token
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
