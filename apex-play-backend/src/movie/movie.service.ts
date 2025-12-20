import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/drizzle/index';
import { eq, and, exists } from 'drizzle-orm';

@Injectable()
export class MovieService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>

  ) { }

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  async findByCategory(id: number) {
    const movies = await this.db.query.movies.findMany({
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

  async findAll() {
    const movies = await this.db.query.movies.findMany({
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
    const movie = await this.db.query.movies.findFirst({
      where: (fields: any, { eq }: any) => eq(fields.id, id),
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
    return movie;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
