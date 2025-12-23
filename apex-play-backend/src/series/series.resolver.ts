import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Series } from './entities/series.entity';
import { SeriesService } from './series.service';

@Resolver(() => Series)
export class SeriesResolver {
    constructor(
        private readonly seriesService: SeriesService
    ) { }

    @Query(() => [Series], { name: 'series' })
    async getAll(@Args('limit', { type: () => Int, nullable: true }) limit: number) {
        return this.seriesService.findAllOptimized();
    }
}
