import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType('SeriesCategoryInfo')
export class Category {
    @Field()
    name: string;
}

@ObjectType()
export class SeriesToCategory {
    @Field(() => Category)
    category: Category;
}
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

    @Field(() => [SeriesToCategory])
    categories: SeriesToCategory[];
}