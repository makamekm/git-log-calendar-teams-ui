import React from "react";
import { LoadingService } from "./LoadingService";
import { LoadingDimmer } from "~/components/Loading/LoadingDimmer";

export const LoadingScreen: React.FC = ({ children }) => {
  const context = React.useContext(LoadingService);

  return <LoadingDimmer show={context.isLoading}>{children}</LoadingDimmer>;
};
