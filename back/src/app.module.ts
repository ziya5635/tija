import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { DatabaseModule } from './shared/database/database.module';
import { MapController } from './map/map.controller';
import { MapService } from './map/map.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, LocationsModule, DatabaseModule],
  controllers: [AppController, MapController],
  providers: [AppService, MapService],
})
export class AppModule { }
//db is not connected to the app, run mongo and check, then continue with front app