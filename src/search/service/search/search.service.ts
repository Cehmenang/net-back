import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const RESULT_LIMIT = 6;

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: string) {
    const [products, brands, categories] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
        select: {
          id: true,
          name: true,
          url: true,
          images: true,
        },
        take: RESULT_LIMIT,
      }),
      this.prisma.brand.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
        select: {
          id: true,
          name: true,
        },
        take: RESULT_LIMIT,
      }),
      this.prisma.category.findMany({
        where: {
          title: { contains: query, mode: 'insensitive' },
        },
        select: {
          id: true,
          title: true,
        },
        take: RESULT_LIMIT,
      }),
    ]);

    return {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        url: p.url,
        image: p.images?.[0] ?? null,
      })),
      brands,
      categories,
    };
  }
}