import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule to load environment variables
    ConfigModule.forRoot({ isGlobal: true }), // Load .env file globally

    TaskModule,

    // Use MongooseModule to connect with MongoDB, using the environment variable for URI
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Access MongoDB URI from .env
      }),
      inject: [ConfigService], // Inject the ConfigService to get environment variables
    }),

    // Use GraphQLModule to set up GraphQL, using environment variables for port and other settings
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // Enable GraphQL playground UI
    }),
  ],
})
export class AppModule {}
