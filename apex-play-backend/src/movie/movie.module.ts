import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieResolver } from './movie.resolver';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieResolver],
})
export class MovieModule { }
