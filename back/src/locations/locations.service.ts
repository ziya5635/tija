import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from '../schemas/location.schema';
import { CreateLocationDto } from './dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectModel(Location.name) private locationModel: Model<Location>,
    ) { }

    async create(createLocationDto: CreateLocationDto): Promise<Location> {
        const createdLocation = new this.locationModel(createLocationDto);
        return createdLocation.save();
    }

    async findNearby(coords: [number, number], radius: number): Promise<Location[]> {
        return this.locationModel.find({
            geometry: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coords,
                    },
                    $maxDistance: radius,
                },
            },
        }).exec();
    }

    async findByUser(userId: string): Promise<Location[]> {
        return this.locationModel.find({ createdBy: userId }).exec();
    }

    async delete(id: string, userId: string): Promise<Location | null> {
        return this.locationModel.findOneAndDelete({ _id: id, createdBy: userId }).exec();
    }
}