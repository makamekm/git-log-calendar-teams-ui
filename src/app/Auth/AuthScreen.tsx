import React from "react";
import { Link } from "react-router-dom";
import { useLocalStore } from "mobx-react";
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
import { AuthService } from "./AuthService";

export const AuthScreen = () => {
  const store = useLocalStore(() => ({
    password: "",
  }));
  const authService = React.useContext(AuthService);

  const onPasswordChange = React.useCallback(
    (e) => {
      store.password = e.currentTarget.value;
    },
    [store]
  );

  const onSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      await authService.authorize(store.password);
      authService.redirectToFrom();
    },
    [store, authService]
  );

  return (
    <EmptyLayout>
      <EmptyLayoutSection center>
        {/* START Header */}
        <HeaderAuth
          title="Your Session is Blocked"
          text="Please provide the correct password to unlock the session"
        />
        {/* END Header */}
        {/* START Form */}
        <Form className="mb-3" onSubmit={onSubmit}>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              value={store.password}
              onChange={onPasswordChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter the password to continue..."
              className="bg-white"
            />
          </FormGroup>
          <Button block type="submit">
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
};
