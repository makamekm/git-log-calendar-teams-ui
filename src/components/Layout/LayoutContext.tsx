import React from "react";
import { isEqual } from "underscore";

export interface LayoutMeta {
  sidebarHidden?: boolean;
  navbarHidden?: boolean;
  footerHidden?: boolean;
  sidebarCollapsed?: boolean;
  screenSize?: string;
  animationsDisabled?: boolean;
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
  breadcrumbs?: {
    name: string;
    url?: string;
  }[];
}

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
  breadcrumbs: {
    name: string;
    url?: string;
  }[];
  meta?: LayoutMeta;
}

export const defaultLayoutMeta: LayoutMeta = {
  breadcrumbs: [],
  sidebarHidden: false,
  navbarHidden: false,
  footerHidden: false,
  pageTitle: null,
  pageDescription: "Git Activity Team Tracker",
  pageKeywords: "git team manager dashboard",
};

export const defaultLayoutState = {
  ...defaultLayoutMeta,
  sidebarCollapsed: true,
  screenSize: "",
  animationsDisabled: true,
} as LayoutState;

export type LayoutConfig = LayoutState & {
  sidebarSlim: boolean;
  toggleSidebar: () => void;
  setElementsVisibility: (elements: { [name: string]: boolean }) => void;
  changeMeta: (metaData: LayoutMeta) => void;
};

export const LayoutContext = React.createContext<LayoutConfig>(null);
const { Provider: LayoutProvider, Consumer: LayoutConsumer } = LayoutContext;

export const WithLayoutMeta: React.FC<{
  meta: LayoutMeta;
}> = ({ meta, children }) => {
  const context = React.useContext(LayoutContext);
  React.useEffect(() => {
    const value = { ...defaultLayoutMeta, ...meta };
    const isDifferent = !isEqual(context.meta, value);
    if (isDifferent) {
      context.changeMeta(value);
    }
  }, [context, meta]);
  return <>{children}</>;
};

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
