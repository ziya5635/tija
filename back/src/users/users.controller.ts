import { Controller, Get, Param, UseGuards, Post, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard) // Protected route
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('profile')
    async getProfile(@Req() req) {
        return this.usersService.findById(req.user.userId);
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Post('connect/:userId')
    async addConnection(
        @Req() req,
        @Param('userId') targetUserId: string
    ) {
        return this.usersService.addConnection(req.user.userId, targetUserId);
    }
}