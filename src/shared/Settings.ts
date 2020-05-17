export interface ApplicationSettings {
  publicKey: string;
  secretKey: string;
  useDriveSwarm: boolean;
  dontCollect: boolean;
  parallelCollectingJobLimit: number;
  forceCollectingInterval: number;
  limitCollectingRepositoriesPerTry: number;
  collectingRepositoryNames: string[];
  useWebServer: boolean;
  webPort: number;
  webHostname: string;
  webIgnoreCors?: boolean;
  webProxy?: string;
  webStaticPath?: string;
  drivePath?: string;
  tempPath?: string;
  initConfigPath?: string;
  useDriveS3: boolean;
  s3AccessKeyId?: string;
  s3SecretAccessKey?: string;
  s3DrivePath?: string;
  s3Bucket?: string;
  openWindowOnStart?: boolean;
}
