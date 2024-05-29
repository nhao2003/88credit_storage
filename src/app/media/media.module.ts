import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { CloudinaryUploaderService } from 'src/core/services/cloudinary-uploader.service';
@Module({
  imports: [],
  controllers: [MediaController],
  providers: [
    {
      provide: 'StorageUploaderService',
      useClass: CloudinaryUploaderService,
    },
    MediaService,
  ],
})
export class MediaModule {}
