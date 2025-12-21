import { IsNotEmpty, IsString } from "class-validator";

export class CreateCastDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

}
