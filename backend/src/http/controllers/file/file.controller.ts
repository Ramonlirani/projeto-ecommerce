import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '@auth-decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUseCases } from '@use-cases/file/file.use-case';
import { Response } from 'express';

@Controller('files')
export class FileController {
  constructor(private fileUseCase: FileUseCases) {}
  @Public()
  @Post('/upload')
  @UseInterceptors(FileInterceptor('upload'))
  async uploadFile(
    @UploadedFile() upload: Express.Multer.File,
    @Res() response: Response,
  ) {
    const url = await this.fileUseCase.uploadToS3(upload);

    return response.status(200).json({
      error: false,
      url,
    });
  }
}
