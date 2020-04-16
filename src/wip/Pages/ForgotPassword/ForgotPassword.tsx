import React from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormText,
  Input,
  Button,
  Label,
  EmptyLayout,
  EmptyLayoutSection,
} from "~/components";
import { HeaderAuth } from "~/app/Pages/HeaderAuth";
import { FooterAuth } from "~/app/Pages/FooterAuth";

export const ForgotPassword = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderAuth title="Forgot Password" />
      {/* END Header */}
      {/* START Form */}
      <Form className="mb-3">
        <FormGroup>
          <Label for="emailAdress">Email Adress or Username</Label>
          <Input
            type="email"
            name="email"
            id="emailAdress"
            placeholder="Enter..."
            className="bg-white"
          />
          <FormText color="muted">
            We&amp;ll never share your email with anyone else.
          </FormText>
        </FormGroup>
        <div className="d-flex">
          <Button tag={Link} to="/" className="align-self-center">
            Reset Password
          </Button>
          <Button
            color="link"
            tag={Link}
            to="/"
            className="align-self-center ml-auto pr-0 text-decoration-none"
          >
            <i className="fa fa-angle-left mr-2"></i> Back to Home
          </Button>
        </div>
      </Form>
      {/* END Form */}
      {/* START Bottom Links */}
      <div className="d-flex mb-5">
        <Link to="/pages/login" className="text-decoration-none">
          Login
        </Link>
        <Link to="/pages/register" className="ml-auto text-decoration-none">
          Register
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterAuth />
      {/* END Footer */}
    </EmptyLayoutSection>
  </EmptyLayout>
);
