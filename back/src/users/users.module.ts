import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { JwtAuthGuard } from '../auth/auth.guard'
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } }),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, JwtAuthGuard],
  controllers: [UsersController],
  exports: [UsersService, JwtAuthGuard], // Export if used by AuthModule
})
export class UsersModule { }
