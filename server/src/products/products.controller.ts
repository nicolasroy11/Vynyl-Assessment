import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./types/Product";
import { CreateProductDto } from "./dto/create-product.dto";
import { EditProductDto } from "./dto/edit-product.dto";

@Controller("products")
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAll(
        @Query("sortField") sortField?: keyof Product,
        @Query("sortOrder") sortOrder: "asc" | "desc" = "asc"
    ) {
        return this.productsService.getAllProducts(sortField, sortOrder);
    }

    @Get("search")
    async search(@Query("q") query: string) {
        return this.productsService.searchProducts(query);
    }

    @Get(":id")
    async getById(@Param("id") id: number) {
        return this.productsService.getProductById(id);
    }

    @Post()
    async create(@Body() dto: CreateProductDto) {
        return this.productsService.createProduct(dto);
    }

    @Patch(":id")
    async update(@Param("id") id: number, @Body() dto: EditProductDto) {
        return this.productsService.updateProduct(id, dto);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.productsService.deleteProduct(id);
    }
}