import React from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  EmptyLayout,
  EmptyLayoutSection,
} from "~/components";
import { HeaderPanel } from "~/app/HeaderPanel";
import { FooterPanel } from "~/app/FooterPanel";

export const LockScreen = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderPanel title="Your Session is Blocked" />
      {/* END Header */}
      {/* START Form */}
      <Form className="mb-3">
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter the password to continue..."
            className="bg-white"
          />
        </FormGroup>
        <Button block tag={Link} to="/">
          Unlock
        </Button>
      </Form>
      {/* END Form */}
      {/* START Bottom Links */}
      <div className="d-flex mb-5">
        <Link to="/pages/login" className="text-decoration-none">
          Sign as Diffrent User
        </Link>
        <Link to="/" className="ml-auto text-decoration-none">
          <i className="fa fa-angle-left mr-2"></i> Back to Home
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterPanel />
      {/* END Footer */}
    </EmptyLayoutSection>
  </EmptyLayout>
);
