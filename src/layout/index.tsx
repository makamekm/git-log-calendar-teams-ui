import React from "react";
import {
  Layout,
  LayoutNavbar,
  LayoutContent,
  LayoutSidebar,
} from "~/components";
import { RoutedNavbars, RoutedSidebars } from "~/routing";

export class AppLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <Layout sidebarSlim>
        <LayoutNavbar>
          <RoutedNavbars />
        </LayoutNavbar>
        <LayoutSidebar>
          <RoutedSidebars />
        </LayoutSidebar>
        <LayoutContent>{children}</LayoutContent>
      </Layout>
    );
  }
}
