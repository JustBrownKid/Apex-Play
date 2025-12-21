import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { privateDecrypt } from 'crypto';
import { schema, seriesToCasts } from 'src/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, exists } from 'drizzle-orm';


@Injectable()
export class SeriesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>
  ) { }

  async create(createSeriesDto: CreateSeriesDto) {
    const newSeries = await this.db.transaction(async (t) => {
      const [series] = await t.insert(schema.series).values({
        title: createSeriesDto.title,
        description: createSeriesDto.description,
        releaseYear: createSeriesDto.releaseYear,
        posterUrl: createSeriesDto.posterUrl,
        backdropUrl: createSeriesDto?.backdropUrl,
        rating: createSeriesDto.rating,
      }).returning()
      if (createSeriesDto?.categoryIds.length) {
        const seriesCategory = createSeriesDto.categoryIds.map((id) => ({
          serieId: series.id,
          categoryId: id
        }));
        await t.insert(schema.seriesToCategories).values(seriesCategory);
      }
      if (createSeriesDto?.castMembers.length) {
        const seriesCast = createSeriesDto.castMembers.map((cast) => ({
          serieId: series.id,
          castId: cast.castId,
          priority: cast.priority || 10,
          role: cast.role,
        }));
        await t.insert(schema.seriesToCasts).values(seriesCast);
      }
      return series;
    })
    return newSeries;
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
      where: (series, { exists }) =>
        exists(
          this.db.select()
            .from(schema.seriesToCategories)
            .where(
              and(
                eq(schema.seriesToCategories.serieId, series.id),
                eq(schema.seriesToCategories.categoryId, id)
              )
            )
        ),
      with: {
        casts: {
          orderBy: (stc, { asc }) => [asc(stc.priority)],
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
    const series = await this.db.query.series.findFirst({
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
    if (!series) throw new NotFoundException(`Series with ID ${id} not found`);
    return series
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    const UpdateSeries = await this.db.transaction(async (t) => {
      const [series] = await t.update(schema.series).set({
        title: updateSeriesDto?.title,
        description: updateSeriesDto?.description,
        releaseYear: updateSeriesDto?.releaseYear,
        posterUrl: updateSeriesDto?.posterUrl,
        backdropUrl: updateSeriesDto?.backdropUrl,
        rating: updateSeriesDto.rating,
      }).where(eq(schema.series.id, id)).returning()
      if (!series) {
        throw new NotFoundException(`Series with ID ${id} not found`);
      }
      if (updateSeriesDto?.categoryIds) {
        await t.delete(schema.seriesToCategories)
          .where(eq(schema.seriesToCategories.serieId, id));
        if (updateSeriesDto.categoryIds.length > 0) {
          await t.insert(schema.seriesToCategories).values(
            updateSeriesDto.categoryIds.map((categoryId) => ({
              serieId: series.id,
              categoryId: categoryId,
            }))
          )
        }
      }
      if (updateSeriesDto?.castMembers) {
        await t.delete(schema.seriesToCasts)
          .where(eq(schema.seriesToCasts.serieId, id));
        if (updateSeriesDto.castMembers.length > 0) {
          await t.insert(schema.seriesToCasts).values(
            updateSeriesDto.castMembers.map((C) => ({
              serieId: series.id,
              castId: C.castId,
              priority: C.priority,
              role: C.role
            }))
          )

        }
      }
      return series
    })
    return UpdateSeries;
  }

  async remove(id: number) {
    const series = await this.db.delete(schema.series).where(eq(schema.series.id, id)).returning();
    return series;
  }
}
