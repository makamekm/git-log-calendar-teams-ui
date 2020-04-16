import React from "react";
import { Link } from "react-router-dom";
import { EmptyLayout, EmptyLayoutSection } from "~/components";
import { HeaderPanel } from "~/app/HeaderPanel";
import { FooterPanel } from "~/app/FooterPanel";

export const Success = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderPanel
        title="Successful Activated"
        icon="check"
        iconClassName="text-success"
        text={
          <React.Fragment>
            To activate your account, please click the link in the activation
            email which has been sent to you. If you do not see the activation
            email in your inbox, you may need to check your spam/junk email
            folders.
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
