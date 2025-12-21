import { IsString, IsNotEmpty, IsInt, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateEpisodeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    @Min(1)
    episodeNumber: number;

    @IsInt()
    @IsOptional()
    @Min(1)
    seasonNumber?: number;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    videoUrl: string;

    @IsInt()
    @IsNotEmpty()
    seriesId: number;
}