export interface Config {
  collectInterval: number;
  evaluateStr?: string;
  tmpDir?: string;
  evaluate?: Function;
  onlyRegistered?: boolean;
  branch?: string;
  password?: string;
  collectMessages?: boolean;
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
}
