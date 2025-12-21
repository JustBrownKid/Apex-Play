import { integer, text } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


export const series = pgTable('series', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    releaseYear: integer('release_year'),
    posterUrl: text('poster_url'),
    backdropUrl: text('backdrop_url'),
    rating: varchar('rating', { length: 10 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
