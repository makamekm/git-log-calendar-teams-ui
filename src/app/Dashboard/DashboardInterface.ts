import { Config } from "~/shared/Config";

export interface DashboardState {
  config: Config;
  teamStats: {
    [team: string]: {
      day: string;
      value: number;
    }[];
  };
  isLoading: boolean;
  isLoadingDelay: boolean;
  limit: number;
  load: () => Promise<void>;
}
