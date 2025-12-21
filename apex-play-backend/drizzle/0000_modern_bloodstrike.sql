-- CREATE TYPE "public"."role" AS ENUM('super_admin', 'admin', 'moderator', 'contributor', 'user');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"release_year" integer,
	"duration" integer,
	"poster_url" text,
	"backdrop_url" text,
	"video_url" text,
	"rating" varchar(10),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "moviesToCategories" (
	"movie_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "moviesToCategories_movie_id_category_id_pk" PRIMARY KEY("movie_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "seriesToCategories" (
	"serie_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "seriesToCategories_serie_id_category_id_pk" PRIMARY KEY("serie_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "casts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"imageUrl" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "casts_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "series" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"release_year" integer,
	"poster_url" text,
	"backdrop_url" text,
	"rating" varchar(10),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "moviesToCasts" (
	"movie_id" integer NOT NULL,
	"cast_id" integer NOT NULL,
	"priority" integer DEFAULT 10,
	"role" text DEFAULT 'Extra',
	CONSTRAINT "moviesToCasts_movie_id_cast_id_pk" PRIMARY KEY("movie_id","cast_id")
);
--> statement-breakpoint
CREATE TABLE "seriesToCasts" (
	"serie_id" integer NOT NULL,
	"cast_id" integer NOT NULL,
	"priority" integer DEFAULT 10,
	"role" text DEFAULT 'Extra',
	CONSTRAINT "seriesToCasts_serie_id_cast_id_pk" PRIMARY KEY("serie_id","cast_id")
);
--> statement-breakpoint
CREATE TABLE "episodes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"episode_number" integer NOT NULL,
	"season_number" integer DEFAULT 1,
	"video_url" text NOT NULL,
	"series_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "moviesToCategories" ADD CONSTRAINT "moviesToCategories_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moviesToCategories" ADD CONSTRAINT "moviesToCategories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seriesToCategories" ADD CONSTRAINT "seriesToCategories_serie_id_series_id_fk" FOREIGN KEY ("serie_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seriesToCategories" ADD CONSTRAINT "seriesToCategories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moviesToCasts" ADD CONSTRAINT "moviesToCasts_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moviesToCasts" ADD CONSTRAINT "moviesToCasts_cast_id_casts_id_fk" FOREIGN KEY ("cast_id") REFERENCES "public"."casts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seriesToCasts" ADD CONSTRAINT "seriesToCasts_serie_id_series_id_fk" FOREIGN KEY ("serie_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seriesToCasts" ADD CONSTRAINT "seriesToCasts_cast_id_casts_id_fk" FOREIGN KEY ("cast_id") REFERENCES "public"."casts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;