import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  // for Graphql
  async findAllOptimized(limit: number = 100) {
    return await this.db.query.movies.findMany({
      limit: limit,
      columns: {
        id: true,
        title: true,
        posterUrl: true,
        rating: true,
        duration: true,
        releaseYear: true,
      },
      with: {
        categories: {
          with: {
            category: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findMoviesByCategory(categoryId: number) {
    return await this.db.query.movies.findMany({
      where: (movies, { exists }) =>
        exists(
          this.db.select()
            .from(schema.moviesToCategories)
            .where(
              and(
                eq(schema.moviesToCategories.movieId, movies.id),
                eq(schema.moviesToCategories.categoryId, categoryId)
              )
            )
        ),
      with: {
        categories: {
          with: {
            category: true
          }
        }
      }
    });
  }


  async create(createMovieDto: CreateMovieDto) {
    const newMovie = await this.db.transaction(async (t) => {
      const [movie] = await t.insert(schema.movies).values({
        title: createMovieDto.title,
        description: createMovieDto.description,
        releaseYear: createMovieDto.releaseYear,
        duration: createMovieDto.duration,
        videoUrl: createMovieDto.videoUrl,
        rating: createMovieDto.rating,
        backdropUrl: createMovieDto.backdropUrl,
        posterUrl: createMovieDto.posterUrl,
      }).returning()
      if (createMovieDto.castMembers?.length) {
        const movieCastValues = createMovieDto.castMembers.map((C) => ({
          movieId: movie.id,
          castId: C.castId,
          priority: C.priority,
          role: C.role
        }));
        await t.insert(schema.moviesToCasts).values(movieCastValues);
      }
      if (createMovieDto.categoryIds?.length) {
        const movieCategoryValues = createMovieDto.categoryIds.map((categoryId) => ({
          movieId: movie.id,
          categoryId: categoryId,
        }));
        await t.insert(schema.moviesToCategories).values(movieCategoryValues);
      }
      return movie;
    });
    return newMovie;
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
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const updateMovie = await this.db.transaction(async (t) => {
      const [movie] = await t.update(schema.movies).set({
        title: updateMovieDto.title,
        description: updateMovieDto.description,
        releaseYear: updateMovieDto.releaseYear,
        duration: updateMovieDto.duration,
        videoUrl: updateMovieDto.videoUrl,
        rating: updateMovieDto.rating,
        backdropUrl: updateMovieDto.backdropUrl,
        posterUrl: updateMovieDto.posterUrl,
      }).where(eq(schema.movies.id, id)).returning()

      if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }

      if (updateMovieDto?.castMembers) {
        await t.delete(schema.moviesToCasts).where(eq(schema.moviesToCasts.movieId, id))
        const movieCast = updateMovieDto.castMembers.map((C) => ({
          movieId: movie.id,
          castId: C.castId,
          priority: C.priority,
          role: C.role
        }))
        await t.insert(schema.moviesToCasts).values(movieCast);
      }

      if (updateMovieDto?.categoryIds) {
        await t.delete(schema.moviesToCategories).where(eq(schema.moviesToCategories.movieId, id));
        const movieCategory = updateMovieDto.categoryIds.map((categoryId) => ({
          movieId: movie.id,
          categoryId: categoryId,
        }))
        await t.insert(schema.moviesToCategories).values(movieCategory);
      }
      return movie
    })
    return updateMovie;
  }

  async remove(id: number) {
    const movie = await this.db.delete(schema.movies).where(eq(schema.movies.id, id)).returning();
    return movie;
  }
}
