import { Inject, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { StorageUploaderService } from 'src/core/services/storage-uploader.service';

@Injectable()
export class MediaService {
  constructor(
    @Inject('StorageUploaderService')
    private readonly storageUploaderService: StorageUploaderService,
  ) {}

  uploadFile(file: Express.Multer.File) {
    return this.storageUploaderService.uploadFile(file, 'media');
  }
}
