import React from "react";
import { observer } from "mobx-react";
import { LoadingDimmer } from "~/components/Loading/LoadingDimmer";
import { LoadingService } from "./LoadingService";

export const LoadingScreen: React.FC = observer(({ children }) => {
  const context = React.useContext(LoadingService);
  return (
    <LoadingDimmer
      show={context.isDisconnected || context.isLoading}
      hideDimmer={context.isDisconnected}
      text={
        context.isDisconnected &&
        "The connection to the server lost, please reload the page"
      }
    >
      {children}
    </LoadingDimmer>
  );
});
