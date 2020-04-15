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
import { HeaderAuth } from "./HeaderAuth";
import { FooterAuth } from "./FooterAuth";

export const AuthScreen = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderAuth
        title="Your Session is Blocked"
        text="Please provide the correct password to unlock the session"
      />
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
        <Link to="/" className="ml-auto text-decoration-none">
          <i className="fa fa-angle-left mr-2"></i> Try to back Home
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterAuth />
      {/* END Footer */}
    </EmptyLayoutSection>
  </EmptyLayout>
);
