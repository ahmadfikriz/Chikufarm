/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ReviewDto {
    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    email_pembeli: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    email_agen: string;

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