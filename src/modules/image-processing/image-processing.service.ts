import {
  UploadCategoryEnum,
  UploadCategoryEnumLabel,
} from '@common/enums/upload-category.enum';
import { appSecrets } from '@config/secrets';
import { IUploadResponse } from '@interface/upload-response';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { v4 as uuidv4 } from 'uuid';

const {
  AWS_ACCESS_KEY_ID,
  AWS_ACCESS_KEY_SECRET,
  AWS_REGION_NAME,
  AWS_BUCKET_PREFIX,
  AWS_S3_SECURE_BUCKET,
  AWS_S3_PUBLIC_BUCKET,
} = appSecrets;

@Injectable()
export class ImageProcessingService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_ACCESS_KEY_SECRET,
      region: AWS_REGION_NAME,
    });
  }

  getFolderName(uploadCategory: UploadCategoryEnum) {
    console.log(uploadCategory);
    const uploadCategoryLabel = UploadCategoryEnumLabel.get(uploadCategory);
    console.log(uploadCategoryLabel, 'upload');
    const folder = `${AWS_BUCKET_PREFIX}${uploadCategoryLabel.substring(1)}/`;
    return folder.startsWith('/') ? folder.substring(1) : folder;
  }

  getBucketName(uploadCategory: UploadCategoryEnum) {
    const uploadCategoryLabel = UploadCategoryEnumLabel.get(uploadCategory);
    const bucketName = uploadCategoryLabel.startsWith('0')
      ? AWS_S3_SECURE_BUCKET
      : AWS_S3_PUBLIC_BUCKET;
    return bucketName;
  }

  async uploadImage(
    buffer: Buffer,
    filename: string,
    contentType: string,
    uploadCategory: UploadCategoryEnum,
  ): Promise<IUploadResponse> {
    const folder = this.getFolderName(uploadCategory);
    const bucketName = this.getBucketName(uploadCategory);
    const fileName = `${uuidv4()}_${filename}`;
    const key = `${folder}${fileName}`;
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      Metadata: { fileName: filename },
    };
    const storage = this.s3;
    return await new Promise(function (resolve, reject) {
      storage.upload(uploadParams, function (err: any, data: any) {
        if (err) {
          reject(err);
        }
        if (data) {
          const response: IUploadResponse = { fileName: key };
          resolve(response);
        }
      });
    });
  }
}
