import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from 'src/drizzle';
import { eq } from 'drizzle-orm';
import { T } from 'node_modules/@faker-js/faker/dist/airline-DF6RqYmq';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.db.insert(schema.categories).values(createCategoryDto).returning();
    return category;
  }

  async findAll() {
    const categories = await this.db.select().from(schema.categories);
    return categories;
  }

  async findOne(id: number) {
    const category = await this.db.select().from(schema.categories).where(eq(schema.categories.id, id));
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.db.update(schema.categories).set(updateCategoryDto).where(eq(schema.categories.id, id)).returning();
    return category;
  }

  async remove(id: number) {
    const category = await this.db.delete(schema.categories).where(eq(schema.categories.id, id)).returning()
    return category;
  }
}
