import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollingUnit } from './entity/polling_unit.entity';
import { AnnouncedPuResults } from './entity/announced_pu_results.entity';
import { Lga } from './entity/lga.entity';
import { Party } from './entity/party.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
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
