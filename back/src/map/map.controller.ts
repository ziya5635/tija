import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { GeocodeDto } from './dto';

@Controller('map')
export class MapController {
    constructor(private mapService: MapService) { }

    @Get('route')
    async getRoute(@Query('start') start: string, // "lat,lng"
        @Query('end') end: string,
    ) {
        const [startLat, startLng] = start.split(',').map(Number);
        const [endLat, endLng] = end.split(',').map(Number);
        return this.mapService.getRoute([startLat, startLng], [endLat, endLng]);
    }

    @Get('geocode')
    async geocode(@Query() { address }: GeocodeDto) {
        //I changed parameters to use dto
        //@Query('address') address: string
        return this.mapService.geocode(address);
    }
}