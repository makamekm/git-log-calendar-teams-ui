import React from "react";

export type ServiceContextHook<T = any> = React.Context<T> & {
  useState: () => T;
  value?: T;
  useLogic: () => void;
};

export const ServiceProviderContext = React.createContext<ServiceContextHook[]>(
  null
);
