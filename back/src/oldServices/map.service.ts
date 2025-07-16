import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from '../schemas/location.schema';

@Injectable()
export class MapService {
    constructor(
        @InjectModel(Location.name) private locationModel: Model<Location>,
    ) { }

    async searchNearby(coords: [number, number], radius: number) {
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
        });
    }
}