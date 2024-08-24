export enum UploadCategoryEnum {
  AuthorImage = 'AuthorImage',
  GeneratedImage = 'GeneratedImage',
  ProcessedImage = 'ProcessedImage',
  UploadedImage = 'UploadedImage',
}

// Add 1 for store in public bucket and 0 for store in secure bucket
export const UploadCategoryEnumLabel = new Map<UploadCategoryEnum, string>([
  [UploadCategoryEnum.AuthorImage, '1/images/authors'],
  [UploadCategoryEnum.GeneratedImage, '0/images/generated-images'],
  [UploadCategoryEnum.ProcessedImage, '1/images/processed-images'],
  [UploadCategoryEnum.UploadedImage, '1/images/uploaded-images'],
]);
