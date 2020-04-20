import React from "react";
import { ServiceContextHook, ServiceProviderContext } from "./context";

export function createService<T>(
  useState: () => T,
  useLogic: (state: T) => void = () => {}
): ServiceContextHook<T> {
  const context: any = React.createContext<T>(null);
  context.useState = useState;
  context.useLogic = useLogic;
  return context;
}

export const ServiceProviderHook: React.FC = ({ children }) => {
  const services = React.useContext(ServiceProviderContext);
  for (const service of services) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = React.useContext(service);
    service.useLogic(state);
  }
  return <>{children}</>;
};

const createServiceProvider: (
  Parent: React.FC,
  service: ServiceContextHook
) => React.FC = (Parent, service) => {
  Parent = Parent || React.Fragment;
  return ({ children }) => {
    service.value = service.useState();
    return (
      <Parent>
        <service.Provider value={service.value}>{children}</service.Provider>
      </Parent>
    );
  };
};

export const ServiceProviderFactory = (
  ...services: ServiceContextHook[]
): React.FC => ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Provider] = React.useState<React.FC>(() =>
    services.reduce<React.FC>((Component, service) => {
      return createServiceProvider(Component, service);
    }, null)
  );

  return (
    <ServiceProviderContext.Provider value={services}>
      <Provider>{children}</Provider>
    </ServiceProviderContext.Provider>
  );
};
