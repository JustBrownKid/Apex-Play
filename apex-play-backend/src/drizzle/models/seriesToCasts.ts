import { pgTable } from "drizzle-orm/pg-core";
import { casts } from "./casts";
import { series } from "./series";
import { integer } from "drizzle-orm/pg-core";
import { primaryKey, text } from "drizzle-orm/pg-core";

export const seriesToCasts = pgTable('seriesToCasts', {
    serieId: integer('serie_id').notNull().references(() => series.id, { onDelete: 'cascade' }),
    castId: integer('cast_id').notNull().references(() => casts.id, { onDelete: 'cascade' }),
    priority: integer('priority').default(10),
    role: text('role').default('Extra'),
},
    (t) => ({
        pk: primaryKey({ columns: [t.serieId, t.castId] })
    })
)