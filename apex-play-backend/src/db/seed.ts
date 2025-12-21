import { sql } from 'drizzle-orm';
import { db, series, movies, categories, moviesToCategories, casts, moviesToCasts, seriesToCategories, seriesToCasts, episodes } from '../drizzle/index';
import { faker } from '@faker-js/faker';

async function main() {
    console.log('🗑️ Deleting old data...');
    await db.execute(sql`
        TRUNCATE TABLE "moviesToCategories", "moviesToCasts", "seriesToCategories", "seriesToCasts", "episodes", "series", "movies", "categories", "casts"
        RESTART IDENTITY CASCADE
    `);

    console.log('🚀 Seeding started...');

    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Adventure', 'Thriller', 'Animation'];
    const insertedCategories = await db.insert(categories).values(
        genres.map(name => ({ name }))
    ).returning();

    const allInsertedCasts: any[] = [];
    for (let i = 0; i < 100; i++) {
        const [cast] = await db.insert(casts).values({
            name: faker.person.fullName(),
            imageUrl: faker.image.urlLoremFlickr({ category: 'people' }),
        }).returning();
        allInsertedCasts.push(cast);
    }

    console.log('📺 Seeding series and episodes...');
    for (let i = 0; i < 60; i++) {
        const [serie] = await db.insert(series).values({
            title: faker.company.name() + " Series",
            description: faker.lorem.paragraph(),
            releaseYear: faker.number.int({ min: 1990, max: 2024 }),
            posterUrl: faker.image.urlLoremFlickr({ category: 'movie' }),

            rating: `PG-${faker.number.int({ min: 1, max: 13 })}`,
        }).returning();

        const randomCats = faker.helpers.arrayElements(insertedCategories, { min: 1, max: 5 });
        for (const cat of randomCats) {
            await db.insert(seriesToCategories).values({
                serieId: serie.id,
                categoryId: cat.id,
            });
        }

        const randomCasts = faker.helpers.arrayElements(allInsertedCasts, { min: 8, max: 15 });
        for (let idx = 0; idx < randomCasts.length; idx++) {
            await db.insert(seriesToCasts).values({
                serieId: serie.id,
                castId: randomCasts[idx].id,
                priority: idx + 1,
                role: faker.person.fullName(),
            });
        }

        const episodeCount = faker.number.int({ min: 8, max: 30 });
        for (let epNum = 1; epNum <= episodeCount; epNum++) {
            await db.insert(episodes).values({
                title: `Episode ${epNum}: ${faker.word.words(3)}`,
                episodeNumber: epNum,
                seasonNumber: 1,
                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                seriesId: serie.id,
            });
        }
    }

    console.log('🎬 Seeding movies...');
    for (let i = 0; i < 80; i++) {
        const [movie] = await db.insert(movies).values({
            title: faker.book.title(),
            description: faker.lorem.paragraph(),
            releaseYear: faker.number.int({ min: 1990, max: 2024 }),
            duration: faker.number.int({ min: 80, max: 180 }),
            posterUrl: faker.image.urlLoremFlickr({ category: 'movie' }),
            rating: `PG-13`,
        }).returning();

        const randomCats = faker.helpers.arrayElements(insertedCategories, { min: 1, max: 3 });
        for (const cat of randomCats) {
            await db.insert(moviesToCategories).values({ movieId: movie.id, categoryId: cat.id });
        }

        const randomCasts = faker.helpers.arrayElements(allInsertedCasts, { min: 8, max: 15 });
        for (let idx = 0; idx < randomCasts.length; idx++) {
            await db.insert(moviesToCasts).values({
                movieId: movie.id,
                castId: randomCasts[idx].id,
                priority: idx + 1,
                role: faker.person.fullName(),
            });
        }
    }

    console.log('✅ Seeding finished successfully!');
    process.exit(0);
}

main().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});