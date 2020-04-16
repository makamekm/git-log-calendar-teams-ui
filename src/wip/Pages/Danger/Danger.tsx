import React from "react";
import { Link } from "react-router-dom";
import { EmptyLayout, EmptyLayoutSection } from "~/components";
import { HeaderPanel } from "~/app/HeaderPanel";
import { FooterPanel } from "~/app/FooterPanel";

export const Danger = () => (
  <EmptyLayout>
    <EmptyLayoutSection center>
      {/* START Header */}
      <HeaderPanel
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
      <FooterPanel />
      {/* END Footer */}
    </EmptyLayoutSection>
  </EmptyLayout>
);
