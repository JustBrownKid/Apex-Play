import { moviesToCategories } from "./moviesToCategories";
import { movies } from "./movies";
import { categories } from "./categories";
import { relations } from "drizzle-orm";
import { moviesToCasts } from "./moviesToCasts";
import { casts } from "./casts";
import { series } from "./series";
import { episodes } from "./episodes";
import { seriesToCategories } from "./seriesToCategories";
import { seriesToCasts } from "./seriesToCasts";

export const moviesRelations = relations(movies, ({ many }) => ({
    categories: many(moviesToCategories),
    casts: many(moviesToCasts)
}));

export const seriesRelations = relations(series, ({ many }) => ({
    episodes: many(episodes),
    categories: many(seriesToCategories),
    casts: many(seriesToCasts)
}))

export const episodesRelations = relations(episodes, ({ one }) => ({
    series: one(series, {
        fields: [episodes.seriesId],
        references: [series.id],
    }),
}))

export const castsRelations = relations(casts, ({ many }) => ({
    movies: many(moviesToCasts),
    series: many(seriesToCasts)
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
    movies: many(moviesToCategories),
    series: many(seriesToCategories)
}));

export const moviesToCastsRelations = relations(moviesToCasts, ({ one }) => ({
    movie: one(movies, {
        fields: [moviesToCasts.movieId],
        references: [movies.id]
    }),
    cast: one(casts, {
        fields: [moviesToCasts.castId],
        references: [casts.id]
    })

}))

export const moviesToCategoriesRelations = relations(moviesToCategories, ({ one }) => ({
    movie: one(movies, {
        fields: [moviesToCategories.movieId],
        references: [movies.id],
    }),
    category: one(categories, {
        fields: [moviesToCategories.categoryId],
        references: [categories.id],
    }),
}));

export const seriesToCastsRelations = relations(seriesToCasts, ({ one }) => ({
    series: one(series, {
        fields: [seriesToCasts.serieId],
        references: [series.id]
    }),
    cast: one(casts, {
        fields: [seriesToCasts.castId],
        references: [casts.id]
    })

}))

export const seriesToCategoriesRelations = relations(seriesToCategories, ({ one }) => ({
    series: one(series, {
        fields: [seriesToCategories.serieId],
        references: [series.id],
    }),
    category: one(categories, {
        fields: [seriesToCategories.categoryId],
        references: [categories.id],
    }),
}));

