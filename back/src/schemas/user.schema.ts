import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    })
    lastLocation: {
        type: string;
        coordinates: [number, number];
    };

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }])
    favoriteLocations: mongoose.Types.ObjectId[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    connections: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ lastLocation: '2dsphere' });