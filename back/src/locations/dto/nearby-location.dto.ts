import { IsNumber, IsOptional } from 'class-validator';

export class NearbyLocationsDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;

    @IsNumber()
    @IsOptional()
    radius?: number = 1000; // Default 1km
}