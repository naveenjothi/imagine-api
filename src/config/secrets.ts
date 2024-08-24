import * as dotenv from 'dotenv';
dotenv.config();
const configFromProcess = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_ACCESS_KEY_SECRET: process.env.AWS_ACCESS_KEY_SECRET,
  AWS_REGION_NAME: process.env.AWS_REGION_NAME,
  AWS_S3_PUBLIC_BUCKET: process.env.AWS_S3_PUBLIC_BUCKET,
  AWS_S3_SECURE_BUCKET: process.env.AWS_S3_SECURE_BUCKET,
  AWS_S3_SIGNIN_URL_EXPIRY_IN_SECONDS:
    process.env.AWS_S3_SIGNIN_URL_EXPIRY_IN_SECONDS || 900,
  AWS_BUCKET_PREFIX: process.env.AWS_BUCKET_PREFIX || 'dev',

  APP_PORT: process.env.APP_PORT || 3000,
};
export const appSecrets = { ...configFromProcess, ...dotenv.config().parsed };
