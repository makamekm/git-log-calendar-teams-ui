import React from "react";
import { Link } from "react-router-dom";
import { EmptyLayout, EmptyLayoutSection } from "~/components";
import { HeaderAuth } from "~/app/Pages/HeaderAuth";
import { FooterAuth } from "~/app/Pages/FooterAuth";

export const Danger = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderAuth
        title="An Error has Occurred"
        icon="close"
        iconClassName="text-danger"
      />
      {/* END Header */}
      {/* START Bottom Links */}
      <div className="text-center mb-5">
        <Link to="/" className="text-decoration-none">
          <i className="fa fa-angle-left mr-2"></i>Correct Errors
        </Link>
      </div>
      {/* END Bottom Links */}
      {/* START Footer */}
      <FooterAuth />
      {/* END Footer */}
    </EmptyLayoutSection>
  </EmptyLayout>
);
