import { Module } from '@nestjs/common';
import { UploadService } from './service/upload/upload.service';

@Module({
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}
