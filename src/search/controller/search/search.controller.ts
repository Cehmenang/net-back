import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from 'src/search/service/search/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('q') q?: string) {
    if (!q || q.trim().length === 0) {
      return { products: [], brands: [], categories: [] };
    }
    return this.searchService.search(q.trim());
  }
}