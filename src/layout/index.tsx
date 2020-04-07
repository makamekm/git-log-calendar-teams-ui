import React from "react";
import PropTypes from "prop-types";

import "../styles/bootstrap.scss";
import "../styles/main.scss";
import "../styles/plugins/plugins.scss";
import "../styles/plugins/plugins.css";

import { RoutedNavbars, RoutedSidebars } from "../routes";
import { Layout } from "../components/Layout/Layout";
import { LayoutNavbar } from "../components/Layout/LayoutNavbar";
import { LayoutContent } from "../components/Layout/LayoutContent";
import { LayoutSidebar } from "../components/Layout/LayoutSidebar";

class AppLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

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

export default AppLayout;
