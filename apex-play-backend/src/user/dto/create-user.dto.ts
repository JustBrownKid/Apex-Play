import { IsString, IsNotEmpty, IsEmail, IsInt, IsEnum, IsOptional } from 'class-validator';


const enum UserRole {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    CONTRIBUTOR = 'contributor',
    USER = 'user',
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    role: UserRole = UserRole.USER;

}
