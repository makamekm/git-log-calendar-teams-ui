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
}
