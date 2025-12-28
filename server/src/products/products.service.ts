import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "./types/Product";
import { CreateProductDto } from "./dto/create-product.dto";
import { EditProductDto } from "./dto/edit-product.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllProducts(sortField?: keyof Product, sortOrder: "asc" | "desc" = "asc") {
        const sort = sortField ? { [sortField]: sortOrder } : {};
        let products = this.prisma.product.findMany({ orderBy: sort });
        return products
    }
    
    async searchProducts(query: string) {
        return this.prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                    { sku: { contains: query } },
                ],
            },
        });
    }

    async getProductById(id: number) {
        return this.prisma.product.findUnique({ where: { id } });
    }

    async createProduct(data: CreateProductDto) {
        return this.prisma.product.create({ data });
    }

    async updateProduct(id: number, data: EditProductDto) {
        return this.prisma.product.update({
            where: { id },
            data: { ...data },
        });
    }

    async deleteProduct(id: number) {
        return this.prisma.product.delete({ where: { id } });
    }
}