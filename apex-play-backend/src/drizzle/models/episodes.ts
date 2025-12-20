import { integer, text } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { series } from "./series";

export const episodes = pgTable('episodes', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    episodeNumber: integer('episode_number').notNull(),
    seasonNumber: integer('season_number').default(1),
    videoUrl: text('video_url').notNull(),
    seriesId: integer('series_id').references(() => series.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
