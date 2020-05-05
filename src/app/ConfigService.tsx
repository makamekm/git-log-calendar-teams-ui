import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { LoadingService } from "~/app/Loading/LoadingService";
import { useOnChange } from "~/hooks";
import { ipc } from "~/shared/ipc";

export const ConfigService = createService(
  () => {
    const state = useLocalStore(() => ({
      isLoading: false,
      onConfigUpdateStarted() {
        state.isLoading = true;
      },
      onConfigUpdateFinished() {
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    const loadingService = React.useContext(LoadingService);
    React.useEffect(() =>
      ipc.channels.ON_CONFIG_UPDATE_STARTED(state.onConfigUpdateStarted)
    );
    React.useEffect(() =>
      ipc.channels.ON_CONFIG_UPDATE_FINISHED(state.onConfigUpdateFinished)
    );
    useOnChange(state, "isLoading", (isLoading) =>
      loadingService.setLoading(isLoading)
    );
  }
);
