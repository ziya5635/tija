import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://admin:admin@localhost:27017', {
            retryAttempts: 3, // Number of connection retry attempts
            retryDelay: 1000, // Delay between retries (ms)
            auth: {
                username: process.env.DB_USERNAME,  // From admin database
                password: process.env.DB_PASSWORD
            },
            authSource: 'admin',
            dbName: 'geospatial-app',
        }),
    ],
    exports: [MongooseModule], // Export if needed by other modules
})
export class DatabaseModule { }