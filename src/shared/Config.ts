export interface Config {
  collectInterval: number;
  repositories: {
    url: string;
    name?: string;
    branch?: string;
    exclude?: string[];
  }[];
  users: {
    name: string;
    associations: string[];
  }[];
  teams: {
    name: string;
    invert?: boolean;
    users?: string[];
  }[];
  evaluateStr?: string;
  evaluate?: string | Function;
  onlyRegistered?: boolean;
  branch?: string;
  cleanTmp?: boolean;
  debug?: boolean;
  tmpDir?: string;
  statsDir?: string;
  path?: string;
}
