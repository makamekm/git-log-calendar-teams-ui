import React from "react";
import { Link } from "react-router-dom";

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";
import { EmptyLayoutSection } from "../../../components/EmptyLayout/EmptyLayoutSection";
import { EmptyLayout } from "../../../components/EmptyLayout/EmptyLayout";
import {
  Form,
  FormGroup,
  Label,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from "reactstrap";

export const Error404 = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderAuth title="Error 404" />
      {/* END Header */}
      {/* START Form */}
      <Form className="mb-3">
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
      </Form>
      {/* END Form */}
      {/* START Bottom Links */}
      <div className="d-flex mb-5">
        <Link to="/pages/login">Back to Home</Link>
        <Link to="/" className="ml-auto text-decoration-none">
          Support
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterAuth />
      {/* END Footer */}
    </EmptyLayoutSection>
  </EmptyLayout>
);
