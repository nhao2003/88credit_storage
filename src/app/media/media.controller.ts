import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcBody, RpcFile } from 'src/common/decorators';
@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @MessagePattern('storage.upload')
  upload(
    @RpcFile() file: Express.Multer.File,
    @RpcBody() body: CreateMediaDto,
  ) {
    if (file === undefined) {
      throw new BadRequestException('No file uploaded');
    }
    if (body.folder === undefined) {
      throw new BadRequestException('No folder specified');
    }
    return this.mediaService.uploadFile(file, body.folder);
  }
}
