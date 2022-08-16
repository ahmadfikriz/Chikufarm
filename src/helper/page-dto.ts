/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Max } from "class-validator"

export class PageRequestDto {
    @ApiProperty({required:false, default:1})
    page : number = 1

    @ApiProperty({required:false, default:10})
    limit : number = 10
}

export class PageResponseDto{
    @ApiProperty()
    total : number

    @ApiProperty()
    pages : number
}