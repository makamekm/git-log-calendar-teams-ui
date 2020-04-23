import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  // Form,
  // FormGroup,
  // Label,
  // InputGroup,
  // Input,
  // InputGroupAddon,
  // Button,
  EmptyLayoutSection,
  // EmptyLayout,
  WithLayoutMeta,
  Container,
} from "~/components";
import { HeaderPanel } from "~/app/HeaderPanel";
import { FooterPanel } from "~/app/FooterPanel";

export const Error404 = () => {
  let { pathname } = useLocation();
  return (
    <Container>
      <WithLayoutMeta meta={{}} />
      <EmptyLayoutSection center>
        {/* START Header */}
        <HeaderPanel title="Error 404" />
        {/* END Header */}
        {/* START Form */}

        <div className="mb-3">{pathname}</div>

        {/* <Form className="mb-3">
          <FormGroup>
            <Label for="search">Search</Label>
            <InputGroup>
              <Input
                type="text"
                name="text"
                id="search"
                placeholder="Enter search phrase here..."
                className="bg-white"
              />
              <InputGroupAddon addonType="append">
                <Button tag={Link} to="/">
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form> */}

        {/* END Form */}
        {/* START Bottom Links */}
        <div className="d-flex mb-5">
          <Link to="/">Back to Home</Link>
          <Link to="/help" className="ml-auto text-decoration-none">
            Support
          </Link>
        </div>
        {/* END Bottom Links */}
        {/* START Footer */}
        <FooterPanel />
        {/* END Footer */}
      </EmptyLayoutSection>
    </Container>
  );
};
