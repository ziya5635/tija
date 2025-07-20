import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../schemas/location.schema';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { JwtAuthGuard } from '../auth/auth.guard'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } }),
  MongooseModule.forFeature([
    { name: Location.name, schema: LocationSchema }
  ]),
  ],
  providers: [LocationsService, JwtAuthGuard],
  controllers: [LocationsController],
  exports: [LocationsService, JwtAuthGuard], // Export if used by other modules
})
export class LocationsModule { }