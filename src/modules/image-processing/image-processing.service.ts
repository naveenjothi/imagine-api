import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { PassThrough } from 'stream';

@Injectable()
export class ImageProcessingService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadImage(
    fileStream: NodeJS.ReadableStream,
    filename: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const uploadParams = {
      Bucket: 'image',
      Key: filename, // File name you want to save as in S3
      Body: fileStream.pipe(new PassThrough()), // Pipe the file stream to PassThrough to handle the stream properly
    };

    return this.s3.upload(uploadParams).promise();
  }
}
