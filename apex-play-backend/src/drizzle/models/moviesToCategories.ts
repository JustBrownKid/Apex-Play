import { pgTable } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { movies } from "./movies";
import { integer } from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";

export const moviesToCategories = pgTable('moviesToCategories', {
    movieId: integer('movie_id').notNull().references(() => movies.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
},
    (t) => ({
        pk: primaryKey({ columns: [t.movieId, t.categoryId] })
    })
)