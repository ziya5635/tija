import { Controller, Post, Get, Body, UseGuards, Req, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto';
import { NearbyLocationsDto } from './dto';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
    constructor(private locationsService: LocationsService) { }

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
