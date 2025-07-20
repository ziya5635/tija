import { Controller, Post, Get, Body, UseGuards, Req, Query, Delete, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto';
import { NearbyLocationsDto } from './dto';
import { User } from 'src/users/users.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
    constructor(private locationsService: LocationsService) { }

    @Get('favorites')
    async getFavorites(@User() user: any) {
        console.log("user:", user)
        var res = await this.locationsService.getUserFavorites(user.userId);
        return res;
    }

    @Post('favorites')
    async addFavorite(
        @User() user: any,
        @Body() locationData: { name: string; geometry: { type: string; coordinates: [number, number] }; address: string }
    ) {
        return this.locationsService.addFavorite({
            userId: user.userId,
            ...locationData
        });
    }

    @Delete('favorites/:id')
    // @UseGuards(JwtAuthGuard)
    async removeFavorite(@User() user: any, @Param('id') id: string) {
        return this.locationsService.removeFavorite(user.userId, id);
    }

    @Post()
    async createLocation(@Body() dto: CreateLocationDto, @Req() req) {
        return this.locationsService.create({
            ...dto,
            createdBy: req.user.userId,
        });
    }

    @Get('nearby')
    async getNearby(
        @Query() { lat, lng, radius = 1000 }: NearbyLocationsDto
    ) {
        return this.locationsService.findNearby([lat, lng], radius);
    }


}
//I changed the getNearby function's parameters from below to what is currently seen
// @Query('lat') lat: number,
//     @Query('lng') lng: number,
//         @Query('radius') radius: number = 1000,
