import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    category!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @IsNotEmpty()
    stock!: number;

    @IsString()
    @IsNotEmpty()
    brand!: string;

    @IsString()
    @IsNotEmpty()
    sku!: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    weight!: number;
}