import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "react-service-provider";
import { useOnChange, useDelay } from "~/hooks";
import { ipc } from "~/shared/ipc";
import { DashboardState, DashboardService } from "./DashboardService";

export interface MessageState {
  dashboardService?: DashboardState;
  messages: {
    message: string;
    user: string;
    date: string;
    repository: string;
    value: number;
  }[];
  maxMessages: number;
  query: string;
  queryDelay: string;
  isLoading: boolean;
  load: () => Promise<void>;
}

export const MessageService = createService<MessageState>(
  () => {
    const state: MessageState = useLocalStore<MessageState>(() => ({
      isLoading: false,
      query: "",
      queryDelay: "",
      messages: [],
      maxMessages: 10,
      load: async () => {
        if (state.dashboardService.mode) {
          state.isLoading = true;
          state.messages = await ipc.handlers.GET_MESSAGES({
            mode: state.dashboardService.mode,
            name: state.dashboardService.name,
            limit: state.dashboardService.limit,
            maxMessages: 10,
            query: state.queryDelay,
          });
          state.isLoading = false;
        }
      },
    }));
    return state;
  },
  (state) => {
    state.dashboardService = React.useContext(DashboardService);
    useDelay(state, "query", "queryDelay");
    useOnChange(state, "queryDelay", state.load);
  }
);
