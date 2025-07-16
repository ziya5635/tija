import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Location extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    })
    geometry: {
        type: string;
        coordinates: [number, number];
    };

    @Prop()
    address: string;

    @Prop()
    createdBy: string; // User ID
}

export const LocationSchema = SchemaFactory.createForClass(Location);
LocationSchema.index({ geometry: '2dsphere' });