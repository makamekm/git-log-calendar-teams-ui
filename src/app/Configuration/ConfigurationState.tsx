import { Config } from "~/shared/Config";

export interface ConfigurationState {
  isDirty: boolean;
  config: Config;
  isLoading: boolean;
  excludes: string[];
  users: string[];
  repositories: string[];
  usersQuery: string;
  usersQueryDelay: string;
  allUsers: {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
    valueTotal: number;
  }[];
  allUsersQueryed: ConfigurationState["allUsers"];
  usedAssociations: string[];
  associations: string[];
  load: () => Promise<void>;
  save: () => Promise<void>;
}
