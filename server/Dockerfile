FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Generate Prisma client using the schema in src/prisma
RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --schema=src/prisma/schema.prisma && npx tsx src/prisma/seed.ts && npm run start:dev"]
