import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollingUnit } from './entity/polling_unit.entity';
import { AnnouncedPuResults } from './entity/announced_pu_results.entity';
import { Lga } from './entity/lga.entity';
import { Party } from './entity/party.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get('DATABASE_TYPE') || process.env.DATABASE_TYPE,
        host: config.get('DATABASE_HOST') || process.env.DATABASE_HOST,
        port: config.get('DATABASE_PORT') || process.env.DATABASE_PORT,
        username:
          config.get('DATABASE_USERNAME') || process.env.DATABASE_USERNAME,
        password:
          config.get('DATABASE_PASSWORD') || process.env.DATABASE_PASSWORD,
        database: config.get('DATABASE_NAME') || process.env.DATABASE_NAME,
        syncronize: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([PollingUnit, AnnouncedPuResults, Lga, Party]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
