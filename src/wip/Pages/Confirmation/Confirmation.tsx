import React from "react";
import { Link } from "react-router-dom";
import { EmptyLayout, EmptyLayoutSection } from "~/components";
import { HeaderPanel } from "~/app/HeaderPanel";
import { FooterPanel } from "~/app/FooterPanel";

export const Confirmation = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderPanel
        title="Confirm Your Email Address"
        icon="envelope"
        text={
          <React.Fragment>
            The confirmation mail was sent to
            <i>email@example.com</i> Check your mailbox and hit the{" "}
            <strong>Confirm My Email</strong>
            link to confirm your email address.
          </React.Fragment>
        }
      />
      {/* END Header */}
      {/* START Bottom Links */}
      <div className="text-center mb-5">
        <Link to="/" className="text-decoration-none">
          <i className="fa fa-angle-left mr-2"></i>Back to Home
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterPanel />
      {/* END Footer */}
    </EmptyLayoutSection>
  </EmptyLayout>
);
