export interface ApplicationSettings {
  publicKey: string;
  secretKey: string;
  useDriveSwarm: boolean;
  dontCollect: boolean;
  parallelCollectLimit: number;
  forceCollectingInterval: number;
  limitCollectRepositoriesPerTry: number;
  repositoryNamesToCollect: string[];
  isDriveWritable?: boolean;
}
