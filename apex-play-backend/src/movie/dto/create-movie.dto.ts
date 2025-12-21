import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsUrl,
    MaxLength,
    Min,
    IsArray
} from 'class-validator';


import { Type } from 'class-transformer';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    releaseYear?: number;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Type(() => Number)
    duration?: number;

    @IsUrl()
    @IsOptional()
    posterUrl?: string;

    @IsUrl()
    @IsNotEmpty()
    backdropUrl?: string;

    @IsUrl()
    @IsNotEmpty()
    videoUrl?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    rating?: string;

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    categoryIds?: number[];

    @IsArray()
    @IsOptional()
    castMembers?: { castId: number; priority: number; role: string }[];

}