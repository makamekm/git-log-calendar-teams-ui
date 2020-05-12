import React from "react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { isEqual } from "lodash";
import { useSimpleSyncLocalStorage } from "~/hooks";

const defaultState = {
  breadcrumbs: [],
  pageTitle: null,
  pageDescription: "Git Activity Team Tracker",
  pageKeywords: "git team manager dashboard",
  footer: true,
  scrollable: true,
  sidebarOpened: false,
};

export interface LayoutConfig {
  breadcrumbs?: {
    name: string;
    url?: string;
  }[];
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
  footer?: boolean;
  scrollable?: boolean;
  sidebarCollapsed?: boolean;
  sidebarOpened?: boolean;
  change?: (config: LayoutConfig) => void;
}

export const LayoutService = createService(
  () => {
    const state = useLocalStore<LayoutConfig>(() => ({
      ...defaultState,
      change: (config: LayoutConfig) => {
        const newObj = {
          ...defaultState,
          ...config,
        };
        for (const key in newObj) {
          state[key] = newObj[key];
        }
      },
    }));
    return state;
  },
  (state) => {
    useSimpleSyncLocalStorage(state, "sidebarCollapsed");
  }
);

export const useLayoutConfig = (config: LayoutConfig) => {
  const service = React.useContext(LayoutService);
  const [storage] = React.useState(() => ({
    config: null,
  }));
  React.useEffect(() => {
    const areObjsDifferent =
      storage.config == null || isEqual(config, storage.config);
    if (areObjsDifferent) {
      storage.config = config;
      service.change(config);
    }
  }, [service, config, storage]);
};
