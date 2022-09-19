/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class EditPasswordDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    // @Match()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    confirm_password: string;
}