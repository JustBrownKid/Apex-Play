import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as categoriesSchema from './models/categories';
import * as moviesSchema from './models/movies';
import * as moviesToCategoriesSchema from './models/moviesToCategories';
import * as moviesToCastsSchema from './models/moviesToCasts';
import * as seriesToCategoriesSchema from './models/seriesToCategories';
import * as seriesToCastsSchema from './models/seriesToCasts';
import * as relationsSchema from './models/relations';
import * as usersSchema from './models/users';
import * as castsSchema from './models/casts';
import * as seriesSchema from './models/series';
import * as episodesSchema from './models/episodes';


dotenv.config();
export const schema = {
    ...categoriesSchema,
    ...moviesSchema,
    ...moviesToCategoriesSchema,
    ...relationsSchema,
    ...usersSchema,
    ...castsSchema,
    ...moviesToCastsSchema,
    ...seriesSchema,
    ...seriesToCastsSchema,
    ...seriesToCategoriesSchema,
    ...episodesSchema
};

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
export * from './models/categories';
export * from './models/movies';
export * from './models/moviesToCategories';
export * from './models/seriesToCategories';
export * from './models/relations';
export * from './models/users';
export * from './models/casts';
export * from './models/series';
export * from './models/moviesToCasts';
export * from './models/seriesToCasts';
export * from './models/episodes';