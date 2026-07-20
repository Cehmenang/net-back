import { Module } from '@nestjs/common';
import { SearchController } from './controller/search/search.controller';
import { SearchService } from './service/search/search.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
