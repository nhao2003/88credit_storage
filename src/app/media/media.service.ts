import { Inject, Injectable } from '@nestjs/common';
import { StorageUploaderService } from 'src/core/services/storage-uploader.service';

@Injectable()
export class MediaService {
  constructor(
    @Inject('StorageUploaderService')
    private readonly storageUploaderService: StorageUploaderService,
  ) {}

  uploadFile(file: Express.Multer.File, folder: string) {
    // return this.storageUploaderService.uploadFile(file, folder);
    try {
      return this.storageUploaderService.uploadFile(file, folder);
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  }
}
