import { Inject, Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { privateDecrypt } from 'crypto';
import { schema } from 'src/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, exists } from 'drizzle-orm';


@Injectable()
export class SeriesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>
  ) { }

  create(createSeriesDto: CreateSeriesDto) {
    return 'This action adds a new series';
  }

  async findAll() {
    const series = await this.db.query.series.findMany({
      with: {
        casts: {
          orderBy: (moviesToCasts, { asc }) => [asc(moviesToCasts.priority)],
          with: {
            cast: true
          }
        }
        ,
        categories: {
          with: {
            category: true
          }
        }
      }
    })
    return series;
  }


  async findByCategory(id: number) {
    const movies = await this.db.query.series.findMany({
      where: (movies, { exists }) =>
        exists(
          this.db.select()
            .from(schema.moviesToCategories)
            .where(
              and(
                eq(schema.moviesToCategories.movieId, movies.id),
                eq(schema.moviesToCategories.categoryId, id)
              )
            )
        ),
      with: {
        casts: {
          orderBy: (moviesToCasts, { asc }) => [asc(moviesToCasts.priority)],
          with: {
            cast: true
          },
        },
        categories: {
          with: {
            category: true
          }
        }
      }
    })
    return movies;
  }
  async findOne(id: number) {
    return await this.db.query.series.findFirst({
      where: (series, { eq }: any) => eq(series.id, id),
      with: {
        categories: {
          with: { category: true },
        },
        episodes: {
          orderBy: (ep, { asc }: any) => [asc(ep.episodeNumber)],
        },
        casts: {
          with: { cast: true },
          orderBy: (c, { asc }: any) => [asc(c.priority)],
        },

      },
    });
  }

  update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return `This action updates a #${id} series`;
  }

  remove(id: number) {
    return `This action removes a #${id} series`;
  }
}
