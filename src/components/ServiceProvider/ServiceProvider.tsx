import React from "react";

export type ServiceContextHook<T = any> = React.Context<T> & {
  useState: () => T;
  value?: T;
  useLogic: () => void;
};

export function createService<T>(
  useState: () => T,
  useLogic: () => void = () => {}
): ServiceContextHook<T> {
  const context: any = React.createContext<T>(null);
  context.useState = useState;
  context.useLogic = useLogic;
  return context;
}

const ServiceProviderHookRunner: React.FC<{
  services: ServiceContextHook[];
}> = ({ children, services }) => {
  for (const service of services) {
    service.useLogic();
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
    <Provider>
      <ServiceProviderHookRunner services={services}>
        {children}
      </ServiceProviderHookRunner>
    </Provider>
  );
};
