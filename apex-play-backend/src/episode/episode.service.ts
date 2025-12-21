import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class EpisodeService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) { }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const episode = await this.db.insert(schema.episodes).values(createEpisodeDto).returning();
    return episode;
  }

  async findAll() {
    const episodes = await this.db.query.episodes.findMany({
      with: {
        series: true
      }
    })
    return episodes;
  }

  async findBySeriesId(id: number) {
    const episodes = await this.db.query.episodes.findMany({
      where: ((field: any, { eq }: any) => eq(field.seriesId, id)),
      with: {
        series: true
      }
    })
    if (!episodes) throw new NotFoundException(`Episodes with series ID ${id} not found`);
    return episodes;
  }

  async findOne(id: number) {
    const episodes = await this.db.query.episodes.findFirst({
      where: ((field: any, { eq }: any) => eq(field.id, id)),
      with: {
        series: true
      }
    })
    return episodes;
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    const episode = await this.db.update(schema.episodes).set(updateEpisodeDto).where(eq(schema.episodes.id, id)).returning();
    return episode;
  }

  async remove(id: number) {
    const deletedEpisode = await this.db.delete(schema.episodes).where(eq(schema.episodes.id, id)).returning()
    if (!deletedEpisode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }
    return deletedEpisode;

  }
}
