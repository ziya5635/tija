import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapService {
    constructor(private configService: ConfigService) { }

    async geocode(address: string): Promise<any> {
        const response = await axios.get(
            'https://nominatim.openstreetmap.org/search',
            {
                params: {
                    q: address,
                    format: 'json',
                    limit: 1,
                },
            },
        );
        return response.data[0] || null;
    }

    async getRoute(
        start: [number, number],
        end: [number, number],
    ): Promise<any> {
        const response = await axios.get(
            'http://router.project-osrm.org/route/v1/driving/' +
            `${start[1]},${start[0]};${end[1]},${end[0]}`,
            {
                params: {
                    overview: 'full',
                    geometries: 'geojson',
                },
            },
        );
        return response.data;
    }

    async reverseGeocode(coords: [number, number]): Promise<string> {
        const response = await axios.get(
            'https://nominatim.openstreetmap.org/reverse',
            {
                params: {
                    lat: coords[0],
                    lon: coords[1],
                    format: 'json',
                },
            },
        );
        return response.data.display_name;
    }
}