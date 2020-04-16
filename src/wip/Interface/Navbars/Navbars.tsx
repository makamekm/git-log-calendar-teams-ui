import React from "react";
import { Container, Row, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { HeaderSection } from "~/app/HeaderSection";
import { NavbarExample } from "~/wip/Interface/Navbars/NavbarExample";

const ExampleWrap = ({ name, children }: { name?: string; children?: any }) => (
  <React.Fragment>
    <div className="small pt-4 pb-2">{name}</div>
    {children}
  </React.Fragment>
);

export const Navbars = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Navbars" className="display-4 mb-3 mt-2" />

      <p className="mt-4">
        Documentation and examples for Bootstrap’s powerful, responsive
        navigation header, the navbar. Includes support for branding,
        navigation, and more, including support for our collapse plugin.
      </p>

      {/* START Light */}
      <Row>
        <Col lg={12}>
          <HeaderSection no={1} title="Navbars Light">
            Theming the navbar has never been easier thanks to Theme Providers.
            Wrap the <code>Navbar</code> with a <code>NavbarThemeProvider</code>{" "}
            component and set <code>style=&quot;light&quot;</code> and{" "}
            <code>color=&quot;&lt;desired color&gt;&quot;</code>.
          </HeaderSection>

          <ExampleWrap name="Navbar Default #1.01">
            <NavbarExample themeColor="primary" />
          </ExampleWrap>

          <ExampleWrap name="Navbar Pills #1.02">
            <NavbarExample themeColor="success" navStyle="pills" />
          </ExampleWrap>

          <ExampleWrap name="Navbar Accent #1.03">
            <NavbarExample themeColor="info" navStyle="accent" />
          </ExampleWrap>
        </Col>
      </Row>
      {/* END Light */}

      {/* START Dark */}
      <Row>
        <Col lg={12}>
          <HeaderSection no={2} title="Navbars Dark" className="mt-5">
            Theming the navbar has never been easier thanks to Theme Providers.
            Wrap the <code>Navbar</code> with a <code>NavbarThemeProvider</code>{" "}
            component and set <code>style=&quot;dark&quot;</code> and{" "}
            <code>color=&quot;&lt;desired color&gt;&quot;</code>.
          </HeaderSection>

          <ExampleWrap name="Navbar Default #2.01">
            <NavbarExample themeColor="primary" />
          </ExampleWrap>

          <ExampleWrap name="Navbar Pills #2.02">
            <NavbarExample themeColor="success" navStyle="pills" />
          </ExampleWrap>

          <ExampleWrap name="Navbar Accent #2.03">
            <NavbarExample themeColor="info" navStyle="accent" />
          </ExampleWrap>
        </Col>
      </Row>
      {/* END Dark */}

      {/* START Color */}
      <Row>
        <Col lg={12}>
          <HeaderSection no={3} title="Navbars Color" className="mt-5">
            Theming the navbar has never been easier thanks to Theme Providers.
            Wrap the <code>Navbar</code> with a <code>NavbarThemeProvider</code>{" "}
            component and set <code>style=&quot;color&quot;</code> and{" "}
            <code>color=&quot;&lt;desired color&gt;&quot;</code>.
          </HeaderSection>

          <ExampleWrap name="Navbar Default #3.01">
            <NavbarExample themeColor="primary" />
          </ExampleWrap>

          <ExampleWrap name="Navbar Pills #3.02">
            <NavbarExample themeColor="success" navStyle="pills" />
          </ExampleWrap>

          <ExampleWrap name="Navbar Accent #3.03">
            <NavbarExample themeColor="info" navStyle="accent" />
          </ExampleWrap>
        </Col>
      </Row>
      {/* END Color */}
    </Container>
  </React.Fragment>
);
