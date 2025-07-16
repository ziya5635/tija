import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://username:password@localhost:27017/geospatial-app?authSource=admin', {
            retryAttempts: 3, // Number of connection retry attempts
            retryDelay: 1000, // Delay between retries (ms)
        }),
    ],
    exports: [MongooseModule], // Export if needed by other modules
})
export class DatabaseModule { }