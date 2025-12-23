import { Resolver, Query, Int, Args } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';

@Resolver(() => Movie)
export class MovieResolver {
    constructor(private readonly movieService: MovieService) { }

    @Query(() => [Movie], { name: 'movies' })
    async getAll(@Args('limit', { type: () => Int, nullable: true }) limit: number) {
        return this.movieService.findAllOptimized(limit);
    }
}