import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageProcessingService } from './image-processing.service';
import { UploadCategoryEnum } from '@common/enums/upload-category.enum';

@Controller('image')
export class ImageProcessingController {
  constructor(
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('category') uploadCategory: UploadCategoryEnum,
  ) {
    const result = await this.imageProcessingService.uploadImage(
      file.buffer,
      file.originalname,
      file.mimetype,
      uploadCategory,
    );
    return result;
  }
}
