import React from "react";

export interface LayoutState {
  sidebarHidden: boolean;
  navbarHidden: boolean;
  footerHidden: boolean;
  sidebarCollapsed: boolean;
  screenSize: string;
  animationsDisabled: boolean;
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
}

export type LayoutConfig = LayoutState & {
  sidebarSlim: boolean;
  toggleSidebar: () => void;
  setElementsVisibility: (elements: string[]) => void;
  changeMeta: (metaData: LayoutState) => void;
};

const {
  Provider: LayoutProvider,
  Consumer: LayoutConsumer,
} = React.createContext<LayoutConfig>(null);

type WithLayoutConfig = <T>(
  Component:
    | React.Component<
        T & {
          layoutConfig?: LayoutConfig;
        }
      >
    | React.FC<
        T & {
          layoutConfig?: LayoutConfig;
        }
      >
) => React.FC<T>;

export function withLayoutConfigComponent<C extends React.ComponentClass>(
  Component: C
): C {
  const WithLayoutConfig = (props) => (
    <LayoutConsumer>
      {(layoutConfig) => <Component {...props} layoutConfig={layoutConfig} />}
    </LayoutConsumer>
  );
  return WithLayoutConfig as any;
}

export const withLayoutConfig: WithLayoutConfig = (
  Component: React.FC<any>
) => {
  const WithLayoutConfig = (props) => (
    <LayoutConsumer>
      {(layoutConfig) => <Component {...props} layoutConfig={layoutConfig} />}
    </LayoutConsumer>
  );
  return WithLayoutConfig;
};

export { LayoutProvider, LayoutConsumer };
