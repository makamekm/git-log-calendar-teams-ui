import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  LayoutConfig,
  withLayoutConfigComponent,
} from "~/components";

@withLayoutConfigComponent
export class NavbarOnly extends React.Component<{
  layoutConfig?: LayoutConfig;
}> {
  componentDidMount() {
    const { layoutConfig } = this.props;
    layoutConfig.setElementsVisibility({
      sidebarHidden: true,
    });
  }

  componentWillUnmount() {
    const { layoutConfig } = this.props;
    layoutConfig.setElementsVisibility({
      sidebarHidden: false,
    });
  }

  render() {
    return (
      <Container>
        <p className="mb-5 mt-3">
          Welcome to the <b>&quot;Dashboard&quot;</b> Admin Dashboard Theme
          based on{" "}
          <a
            href="https://getbootstrap.com"
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bootstrap 4.x
          </a>{" "}
          version for React called&nbsp;
          <a
            href="https://reactstrap.github.io"
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            reactstrap
          </a>{" "}
          - easy to use React Bootstrap 4 components compatible with React 16+.
        </p>

        <section className="mb-5">
          <h6>Layouts for this framework:</h6>
          <ul className="pl-3">
            <li>
              <Link to="/layouts/navbar" className="text-primary">
                Navbar
              </Link>
            </li>
            <li>
              <Link to="/layouts/sidebar" className="text-primary">
                Sidebar
              </Link>
            </li>
            <li>
              <Link to="/layouts/sidebar-with-navbar" className="text-primary">
                Sidebar with Navbar
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h6>This Starter has:</h6>
          <ul className="pl-3">
            <li>
              <a
                href="http://www.github.com/"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>{" "}
              - which describes how to configure this version.
            </li>
            <li>
              <a
                href="http://www.github.com/"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Credits
              </a>{" "}
              - technical details of which versions are used for this framework.
            </li>
            <li>
              <a
                href="http://www.github.com/"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Roadmap
              </a>{" "}
              - update for this technology for the coming months.
            </li>
            <li>
              <b>Bugs</b> - do you see errors in this version? Please report vie
              email: <i>info@webkom.co</i>
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h6>Work Orders:</h6>
          <p>
            Regarding configuration, changes under client&apos;s requirements.
            <br />
            Pleace contact us through the{" "}
            <a
              href="http://www.github.com/makamekm"
              className="text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.github.com/makamekm
            </a>{" "}
            website.
          </p>
        </section>
      </Container>
    );
  }
}
