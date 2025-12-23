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

    const poster = [
        "https://image.tmdb.org/t/p/w500/oD3Eey4e4Z259XLm3eD3WGcoJAh.jpg",
        "https://image.tmdb.org/t/p/w500/gDVgC9jd917NdAcqBdRRDUYi4Tq.jpg",
        "https://image.tmdb.org/t/p/w500/jNsttCWZyPtW66MjhUozBzVsRb7.jpg",
        "https://image.tmdb.org/t/p/w500/1tUOZQDgZaGqZtrB21MieiXARL2.jpg",
        "https://image.tmdb.org/t/p/w500/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg",
        "https://image.tmdb.org/t/p/w500/7K8w6mdrJp0oaSoKWGyjSZ4Zv2z.jpg",
        "https://image.tmdb.org/t/p/w500/dKL78O9zxczVgjtNcQ9UkbYLzqX.jpg",
        "https://image.tmdb.org/t/p/w500/qCOGGi8JBVEZMc3DVby8rUivyXz.jpg",
        "https://image.tmdb.org/t/p/w500/5CdRxBu7jRDHjthkAL8vE0GdKUD.jpg",
        "https://image.tmdb.org/t/p/w500/eCA5maHDlZtXNTtiLXenwnEw7tc.jpg",
        "https://image.tmdb.org/t/p/w500/waU3o5qRPNA9bIC59DIsDppll11.jpg",
        "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg",
        "https://image.tmdb.org/t/p/w500/cbryTyaWdqrKpQCw6K7zm2jrB5v.jpg",
        "https://image.tmdb.org/t/p/w500/udAxQEORq2I5wxI97N2TEqdhzBE.jpg",
        "https://image.tmdb.org/t/p/w500/8SUzKOqe2ectvhYdSnR7Vq2F3n1.jpg",
        "https://image.tmdb.org/t/p/w500/chpWmskl3aKm1aTZqUHRCtviwPy.jpg",
        "https://image.tmdb.org/t/p/w500/cpQ4VxBJO7vGV3IUdKzSNf4tH9V.jpg",
        "https://image.tmdb.org/t/p/w500/wkZgGYcCQIzX8zvMAHpzg4hFhLF.jpg",
        "https://image.tmdb.org/t/p/w500/qKKG22O5pFxqglG0oMjWTjQWCNl.jpg",
        "https://image.tmdb.org/t/p/w500/e0RU6KpdnrqFxDKlI3NOqN8nHL6.jpg",
        "https://image.tmdb.org/t/p/w500/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg",
        "https://image.tmdb.org/t/p/w500/r4uXvqCeco0KmO0CjlhXuTEFuSE.jpg",
        "https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
        "https://image.tmdb.org/t/p/w500/pHpq9yNUIo6aDoCXEBzjSolywgz.jpg",
        "https://image.tmdb.org/t/p/w500/kE6FV8Lc9Aqir6OlgaNgnbFcy9E.jpg",
        "https://image.tmdb.org/t/p/w500/cb5NyNrqiCNNoDkA8FfxHAtypdG.jpg",
        "https://image.tmdb.org/t/p/w500/8FHOtUpNIk5ZPEay2N2EY5lrxkv.jpg",
        "https://image.tmdb.org/t/p/w500/wiWAg4mKV2S4vImPxsPRIdj2R2B.jpg",
        "https://image.tmdb.org/t/p/w500/6Z37lW0JfLdeFcgH9yaTyg6B9A6.jpg",
        "https://image.tmdb.org/t/p/w500/p6xAExLNFbHcLfvSuvLPoM8aqZU.jpg",
        "https://image.tmdb.org/t/p/w500/zBvw25afDn93embB8L7FzvTT2xq.jpg",
        "https://image.tmdb.org/t/p/w500/hHowAaChDjwueySmwVbsjHmpWa.jpg",
        "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        "https://image.tmdb.org/t/p/w500/fWVSwgjpT2D78VUh6X8UBd2rorW.jpg",
        "https://image.tmdb.org/t/p/w500/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg",
        "https://image.tmdb.org/t/p/w500/flykCMw22y6yv8vKnBjmsW3pneo.jpg",
        "https://image.tmdb.org/t/p/w500/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg",
        "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg",
        "https://image.tmdb.org/t/p/w500/pvMHRi09ur2L1drXh2dXFtuMFgl.jpg",
        "https://image.tmdb.org/t/p/w500/hCKkybW6EfSZoOW3xia9ZsQwaUd.jpg",
        "https://image.tmdb.org/t/p/w500/hlK0e0wAQ3VLuJcsfIYPvb4JVud.jpg",
        "https://image.tmdb.org/t/p/w500/7z8jDiTZZco9moIKpTUImFtTy7o.jpg",
        "https://image.tmdb.org/t/p/w500/uuitWHpJwxD1wruFl2nZHIb4UGN.jpg",
        "https://image.tmdb.org/t/p/w500/z4gVnxTaks3anTycwKjDmvQSuWt.jpg",
        "https://image.tmdb.org/t/p/w500/aFogllaRGlAhk1nqvVGFpZpl4qU.jpg",
        "https://image.tmdb.org/t/p/w500/w46Vw536HwNnEzOa7J24YH9DPRS.jpg",
        "https://image.tmdb.org/t/p/w500/snQLwRrfQAl5YFKVefZq9Lbscki.jpg",
        "https://image.tmdb.org/t/p/w500/nvqW8mOm818QDio3GKKmPLK8kXj.jpg",
        "https://image.tmdb.org/t/p/w500/byWgphT74ClOVa8EOGzYDkl8DVL.jpg",
        "https://image.tmdb.org/t/p/w500/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg",
        "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
        "https://image.tmdb.org/t/p/w500/k7QB1I0VJgD8ibYv7slV2YtMCrO.jpg",
        "https://image.tmdb.org/t/p/w500/8JbuKgQBc8KlXopF1eege54HNQ5.jpg",
        "https://image.tmdb.org/t/p/w500/8EpDSwnjMBc9dmTPEYBF4Bixmwf.jpg",
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        "https://image.tmdb.org/t/p/w500/AnzrE2WHg3DtZrtmB9AnEbAh17m.jpg",
        "https://image.tmdb.org/t/p/w500/dZpH8UEQD2743cMOPjXqNCg7bWv.jpg",
        "https://image.tmdb.org/t/p/w500/qTvFWCGeGXgBRaINLY1zqgTPSpn.jpg",
        "https://image.tmdb.org/t/p/w500/7AfBMebJS8mEtSV5ymdxEPpgvXb.jpg",
        "https://image.tmdb.org/t/p/w500/k18RLaw3Z7kx82lK9V3FzNyJgiH.jpg",
        "https://image.tmdb.org/t/p/w500/eNYGj2DG3n8OrVPTfYunpPW9uas.jpg",
        "https://image.tmdb.org/t/p/w500/A81kDB6a1K86YLlcOtZB27jriJh.jpg",
        "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "https://image.tmdb.org/t/p/w500/ArDLn658OjT3dMThIi4GDQJRuY3.jpg",
        "https://image.tmdb.org/t/p/w500/mCDzIKBPBLLOaFSO7WXCNgrg8f2.jpg",
        "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
        "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        "https://image.tmdb.org/t/p/w500/6FRFIogh3zFnVWn7Z6zcYnIbRcX.jpg"
    ];

    const personImages = [
        "https://image.tmdb.org/t/p/w500/xgXKg2EgqrCGKghJ1QEkJ1dCSEf.jpg",
        "https://image.tmdb.org/t/p/w500/yMK3IADqV2oReJMKdkrcEIBxdtu.jpg",
        "https://image.tmdb.org/t/p/w500/rcmPU3YlhHQVzZlV197qhmRsgEL.jpg",
        "https://image.tmdb.org/t/p/w500/n1O0RnxKPfxvVJUh13Gr0pPGlvd.jpg",
        "https://image.tmdb.org/t/p/w500/yeXPErkuJr3gLNeYOuATt27Z8Kr.jpg",
        "https://image.tmdb.org/t/p/w500/sGjeXXuC2ubZr0a7iKbHNplHATV.jpg",
        "https://image.tmdb.org/t/p/w500/mjReG6rR7NPMEIWb1T4YWtV11ty.jpg",
        "https://image.tmdb.org/t/p/w500/5nCSG5TL1bP1geD8aaBfaLnLLCD.jpg",
        "https://image.tmdb.org/t/p/w500/pORrZ9gppePMsZBHhwRHvNogFU7.jpg",
        "https://image.tmdb.org/t/p/w500/rYcDiM9LrStdlcb80N3WAR2CsHX.jpg",
        "https://image.tmdb.org/t/p/w500/9jHTcwpYgEXb1MXxPEDD0csri9J.jpg",
        "https://image.tmdb.org/t/p/w500/uDnIdU4KGjQg7liFvb9wnALvg95.jpg",
        "https://image.tmdb.org/t/p/w500/e8CUyxQSE99y5IOfzSLtHC0B0Ch.jpg",
        "https://image.tmdb.org/t/p/w500/uZaGuCvf18wKhaYL0IfYJv48yhE.jpg",
        "https://image.tmdb.org/t/p/w500/A6bHIHnDlmKY6pWOlgLNsUf60W5.jpg",
        "https://image.tmdb.org/t/p/w500/jS5FrcVxxJHB4v7sXu7l4VMQb7x.jpg",
        "https://image.tmdb.org/t/p/w500/aWPSiqE1eAQGgQKhN7eahJCz7vI.jpg",
        "https://image.tmdb.org/t/p/w500/tT7QQOrumeGRquaLmWNZk2DyL3Z.jpg",
        "https://image.tmdb.org/t/p/w500/jKhDQOMVQ1JP4gaUXCQg75gvsrm.jpg",
        "https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
        "https://image.tmdb.org/t/p/w500/811vCRSr9s2MFwCIOo1jWHltu3R.jpg",
        "https://image.tmdb.org/t/p/w500/4Lxdxg5akHhsHoZToFe62L8RM9B.jpg",
        "https://image.tmdb.org/t/p/w500/xVrrH7dAoeotune3TWjv5Tr3F3U.jpg",
        "https://image.tmdb.org/t/p/w500/uOEqq05ghCxZXn7w92nriHu0T5A.jpg",
        "https://image.tmdb.org/t/p/w500/lC9pK3ADyPpH4dRo2BKZBaTZPfu.jpg",
        "https://image.tmdb.org/t/p/w500/wdmcJagSRJ65AuJ4IUCzuHAdvgy.jpg",
        "https://image.tmdb.org/t/p/w500/gtBUIpZ3dvLpOMIVORxE6sHSyZj.jpg",
        "https://image.tmdb.org/t/p/w500/QMETB1ypQs7rGgdCDwcTW0hCxR.jpg",
        "https://image.tmdb.org/t/p/w500/xBXLx1m0uzhXIbY3wN8lmPGeUHl.jpg"
    ];
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Adventure', 'Thriller', 'Animation'];
    const insertedCategories = await db.insert(categories).values(
        genres.map(name => ({ name }))
    ).returning();

    const allInsertedCasts: any[] = [];
    console.log('📺 Seeding series and episodes...');

    for (let i = 0; i < 100; i++) {
        const imageUrl = personImages[i % personImages.length];

        const [cast] = await db.insert(casts).values({
            name: faker.person.fullName(),
            imageUrl: imageUrl,
        }).returning();

        allInsertedCasts.push(cast);
    }
    for (let i = 0; i < 60; i++) {
        const [serie] = await db.insert(series).values({
            title: faker.company.name() + " Series",
            description: faker.lorem.paragraph(),
            releaseYear: faker.number.int({ min: 1990, max: 2024 }),
            posterUrl: faker.helpers.arrayElement(poster),
            rating: `PG-${faker.number.int({ min: 1, max: 13 })}`,
        }).returning();

        const randomCats = faker.helpers.arrayElements(insertedCategories, { min: 1, max: 5 });
        for (const cat of randomCats) {
            await db.insert(seriesToCategories).values({ serieId: serie.id, categoryId: cat.id });
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
            posterUrl: faker.helpers.arrayElement(poster),
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',

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