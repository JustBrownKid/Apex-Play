import { pgTable } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { series } from "./series";
import { integer } from "drizzle-orm/pg-core";
import { primaryKey } from "drizzle-orm/pg-core";

export const seriesToCategories = pgTable('seriesToCategories', {
    serieId: integer('serie_id').notNull().references(() => series.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
},
    (t) => ({
        pk: primaryKey({ columns: [t.serieId, t.categoryId] })
    })
)