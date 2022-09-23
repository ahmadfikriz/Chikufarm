/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReviewDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    nama: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    nama_produk: string

    @ApiProperty({ required: true })
    @IsString()
    komentar: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    rating: number;
}