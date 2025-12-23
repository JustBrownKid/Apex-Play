import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('MovieCategory')
export class Category {
    @Field()
    name: string;
}

@ObjectType()
export class MovieToCategory {
    @Field(() => Category)
    category: Category;
}

@ObjectType()
export class Movie {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    posterUrl: string;

    @Field()
    rating: string;

    @Field()
    duration: number;

    @Field(() => [MovieToCategory])
    categories: MovieToCategory[];
}