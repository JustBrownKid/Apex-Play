import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Movie {
    @Field(() => Int)
    id: number;

    @Field()
    posterUrl: string;

    @Field()
    rating: string;


    @Field()
    duration: number;

    @Field()
    title: string;
}