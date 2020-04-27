import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useDelay, useOnLoad } from "~/hooks";
import { ipc } from "~/shared/ipc";
import { ApplicationSettings } from "~/shared/Settings";
import { toJS } from "mobx";

export interface ChatState {
  settings: ApplicationSettings;
  isLoading: boolean;
  isLoadingDelay: boolean;
  isActive: boolean;
  load: () => Promise<void>;
}

export const ChatService = createService<ChatState>(
  () => {
    const state: ChatState = useLocalStore<ChatState>(() => ({
      settings: null,
      isLoading: false,
      isLoadingDelay: false,
      get isActive() {
        return !!(
          state.settings &&
          state.settings.communicationKey &&
          state.settings.email &&
          state.settings.name &&
          state.settings.publicKey &&
          state.settings.secretKey
        );
      },
      load: async () => {
        state.isLoading = true;
        state.settings = await ipc.handlers.GET_SETTINGS();
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    useOnLoad(state.load);
    useDelay(state, "isLoading", "isLoadingDelay");
    React.useEffect(() => ipc.channels.ON_DRIVE_UPDATE(state.load));
    React.useEffect(() => ipc.channels.ON_SETTINGS_UPDATE_FINISH(state.load));
  }
);
