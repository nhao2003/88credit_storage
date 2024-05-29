import { File } from 'buffer';

export interface StorageUploaderService {
  uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
  deleteFile(fileUrl: string): Promise<any>;
}
