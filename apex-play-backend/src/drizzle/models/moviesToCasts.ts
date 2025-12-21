import { pgTable } from "drizzle-orm/pg-core";
import { casts } from "./casts";
import { movies } from "./movies";
import { integer } from "drizzle-orm/pg-core";
import { primaryKey, text } from "drizzle-orm/pg-core";

export const moviesToCasts = pgTable('moviesToCasts', {
    movieId: integer('movie_id').notNull().references(() => movies.id, { onDelete: 'cascade' }),
    castId: integer('cast_id').notNull().references(() => casts.id, { onDelete: 'cascade' }),
    priority: integer('priority').default(10),
    role: text('role').default('Extra'),
},
    (t) => ({
        pk: primaryKey({ columns: [t.movieId, t.castId] })
    })
)