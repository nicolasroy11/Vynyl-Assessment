"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const products = Array.from({ length: 50 }).map((_, i) => {
        const index = i + 1;
        return {
            title: `Flux Capacitor Model ${index}`,
            description: `Flux Capacitor Model ${index} provides reliable inter-dimensional motive force.`,
            category: index % 2 === 0 ? "automotive" : "electronics",
            price: 5.99 + index,
            stock: 10 + index,
            brand: index % 3 === 0 ? "ACME" : "FutureTech",
            sku: `FC-${index.toString().padStart(3, "0")}`,
            weight: 2 + (index % 5),
            meta: {
                create: {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            },
        };
    });
    for (const product of products) {
        await prisma.product.create({ data: product });
    }
    console.log("✅ Seeded 50 products");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map