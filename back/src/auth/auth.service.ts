import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './interfaces/token-payload/token-payload.interface';
import { RegisterDto } from './dto';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
        });
        return this.generateTokens(user);
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.generateTokens(user);
    }

    private async generateTokens(user: any) {
        const payload: TokenPayload = {
            userId: user._id.toString(),
            email: user.email,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    async refreshToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            return this.generateTokens(payload);
        } catch (e) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}