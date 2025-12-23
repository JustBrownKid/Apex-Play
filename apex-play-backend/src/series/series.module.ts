import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { SeriesResolver } from './series.resolver';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesResolver],
})
export class SeriesModule { }
