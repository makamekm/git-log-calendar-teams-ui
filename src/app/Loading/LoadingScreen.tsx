import React from "react";
import { LoadingDimmer } from "~/components/Loading/LoadingDimmer";
import { LoadingService } from "./LoadingService";

export const LoadingScreen: React.FC = ({ children }) => {
  const context = React.useContext(LoadingService);
  return <LoadingDimmer show={context.isLoading}>{children}</LoadingDimmer>;
};
