import { Config } from "~/shared/Config";

export interface ConfigurationState {
  isDirty: boolean;
  config: Config;
  isLoading: boolean;
  isLoadingDelay: boolean;
  excludes: string[];
  users: string[];
  repositories: string[];
  allUsers: {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
  }[];
  usedAssociations: string[];
  associations: string[];
  load: () => Promise<void>;
  save: () => Promise<void>;
}
