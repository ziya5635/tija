import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './auth.guard';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'your-secret-key', // Use environment variable in production
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [JwtAuthGuard, JwtModule]
})
export class AuthModule { }