import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Series {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    posterUrl: string;

    @Field()
    rating: string;

}
