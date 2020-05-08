export interface ApplicationSettings {
  publicKey: string;
  secretKey: string;
  useDriveSwarm: boolean;
  dontCollect: boolean;
  parallelCollectingJobLimit: number;
  forceCollectingInterval: number;
  limitCollectingRepositoriesPerTry: number;
  collectingRepositoryNames: string[];
  drivePath?: string;
  tempPath?: string;
  useS3: boolean;
  s3AccessKeyId?: string;
  s3SecretAccessKey?: string;
  s3DrivePath?: string;
  s3Bucket?: string;
}
