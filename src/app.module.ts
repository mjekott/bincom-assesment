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
        type: process.env.DATABASE_TYPE || 'postgres',
        host: process.env.DATABASE_HOST || 'balarama.db.elephantsql.com',
        port: process.env.DATABASE_PORT || '5432',
        username: process.env.DATABASE_USERNAME || 'cigukedm',
        password:
          process.env.DATABASE_PASSWORD || 'xvjZO4JZXl3Dsv2tyKOuQ9mB65PjYBnF',
        database: process.env.DATABASE_NAME || 'cigukedm',
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
