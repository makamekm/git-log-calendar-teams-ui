export interface ApplicationSettings {
  publicKey: string;
  secretKey: string;
  useDriveSwarm: boolean;
  dontCollect: boolean;
  parallelCollectLimit: number;
  repositoryNamesToCollect: string[];
  isDriveWritable?: boolean;
}
