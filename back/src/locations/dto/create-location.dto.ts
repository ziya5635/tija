import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;

    @IsArray()
    @IsNumber({}, { each: true })
    coordinates: [number, number];

    @IsString()
    address?: string;

    @IsString()
    createdBy: string
}