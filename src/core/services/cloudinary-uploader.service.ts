import { ConfigService } from '@nestjs/config';
import { StorageUploaderService } from './storage-uploader.service';
import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import EnvConstants from 'src/common/constants/env.constant';

@Injectable()
export class CloudinaryUploaderService implements StorageUploaderService {
  constructor(private configService: ConfigService) {
    console.log('CloudinaryUploaderService');
    console.log(this.configService.get(EnvConstants.CLOUDINARY_CLOUD_NAME));
    console.log(this.configService.get(EnvConstants.CLOUDINARY_API_KEY));
    console.log(this.configService.get(EnvConstants.CLOUDINARY_API_SECRET));
    v2.config({
      cloud_name: this.configService.get(EnvConstants.CLOUDINARY_CLOUD_NAME),
      api_key: this.configService.get(EnvConstants.CLOUDINARY_API_KEY),
      api_secret: this.configService.get(EnvConstants.CLOUDINARY_API_SECRET),
    });
  }
  uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream({ resource_type: 'auto', folder }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        })
        .end(file.buffer);
    });
  }
  deleteFile(fileUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const publicId = fileUrl.split('/').pop().split('.').shift();
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
