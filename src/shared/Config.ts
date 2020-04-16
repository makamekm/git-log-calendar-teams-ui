export interface Config {
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
  evaluate?: string;
}
