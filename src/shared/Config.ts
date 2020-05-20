export interface Config {
  collectInterval: number;
  ignoreSSLCertificate?: boolean;
  evaluateStr?: string;
  tmpDir?: string;
  evaluate?: Function;
  onlyRegistered?: boolean;
  branch?: string;
  password?: string;
  collectMessages?: boolean;
  repositories: {
    id: string;
    url: string;
    name: string;
    branch?: string;
    exclude?: string[];
  }[];
  users: {
    id: string;
    name: string;
    associations: string[];
  }[];
  teams: {
    id: string;
    name: string;
    invert?: boolean;
    users?: string[];
    repositories: string[];
  }[];
}
