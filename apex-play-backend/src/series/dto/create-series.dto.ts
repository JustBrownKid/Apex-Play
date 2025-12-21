import { Type } from 'class-transformer';
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

export class CreateSeriesDto {
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

    @IsUrl()
    @IsNotEmpty()
    posterUrl?: string;

    @IsUrl()
    @IsOptional()
    backdropUrl?: string;

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
