import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';
import sharp from 'sharp';

export type UploadType = 'product' | 'brand' | 'category'

@Injectable()
export class UploadService {
  private readonly baseUploadDir = join(process.cwd(), 'uploads');

  async saveFiles(files: Express.Multer.File[], type: UploadType | string): Promise<string[]> {
    const safeType = type.toLowerCase().replace(/[^a-z0-9-_]/g, '');
    const targetDir = join(this.baseUploadDir, safeType);
    await fs.mkdir(targetDir, { recursive: true });

    const urls = await Promise.all(
      files.map(async (file) => {
        const fileName = `${safeType.toUpperCase()}-${randomUUID()}.webp`;
        const filePath = join(targetDir, fileName);

        await sharp(file.buffer)
          .webp({ quality: 80 })
          .toFile(filePath);

        return `/uploads/${safeType}/${fileName}`;
      }),
    );

    return urls;
  }

    async deleteFiles(imagePaths: string[]): Promise<void> {
        await Promise.all(
            imagePaths.map(async (imagePath) => {
                try {
                    const fullPath = join(process.cwd(), imagePath);
                    await fs.unlink(fullPath);
                } catch (err) {
                    console.error(`Gagal hapus file: ${imagePath}`, err);
                }
            }),
        );
    }
}