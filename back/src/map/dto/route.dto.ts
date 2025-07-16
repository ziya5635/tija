import { IsArray, IsNumber } from 'class-validator';

export class RouteDto {
    @IsArray()
    @IsNumber({}, { each: true })
    start: [number, number];

    @IsArray()
    @IsNumber({}, { each: true })
    end: [number, number];
}