import { Inject, Injectable } from '@nestjs/common';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class CastService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) { }

  async create(createCastDto: CreateCastDto) {
    const cast = await this.db.insert(schema.casts).values(createCastDto).returning();
    return cast;
  }

  async findAll() {
    const casts = await this.db.select().from(schema.casts);
    return casts;
  }

  async findOne(id: number) {
    const cast = await this.db.select().from(schema.casts).where(eq(schema.casts.id, id));
    return cast;
  }

  async update(id: number, updateCastDto: UpdateCastDto) {
    const cast = await this.db.update(schema.casts).set(updateCastDto).where(eq(schema.casts.id, id)).returning();
    return cast;
  }

  async remove(id: number) {
    const cast = await this.db.delete(schema.casts).where(eq(schema.casts.id, id)).returning();
    return cast;
  }
}
