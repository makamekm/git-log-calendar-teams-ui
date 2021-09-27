import React from "react";
import classNames from "classnames";
import { ipc } from "~/shared/ipc";
import { useLocalStore, observer } from "mobx-react";
import { LayoutService } from "~/components/Layout/LayoutService";

export const NavbarPrintPDF = observer(
  ({ className }: { className?: string }) => {
    const state = useLocalStore(() => ({
      isPrinting: false,
    }));
    const service = React.useContext(LayoutService);
    const title = service.pageTitle
      ? service.pageTitle + " - Report"
      : "Report";
    return (
      <div
        className={classNames(className)}
        onClick={async () => {
          state.isPrinting = true;
          await ipc.handlers.PRINT_PDF(title);
          state.isPrinting = false;
        }}
      >
        <i className="far fa-file-pdf"></i>
        <style global jsx>{`
        .container {
          ${state.isPrinting ? "min-width: 1024px !important;" : ""}
          ${state.isPrinting ? "width: 1024px !important;" : ""}
          ${state.isPrinting ? "max-width: 1024px !important;" : ""}
        }
        body {
          ${state.isPrinting ? "min-width: 1024px !important;" : ""}
          ${state.isPrinting ? "width: 1024px !important;" : ""}
          ${state.isPrinting ? "max-width: 1024px !important;" : ""}
        }
        .printing {
          ${state.isPrinting ? "display: flex;" : ""}
          opacity: 1;
        }
      `}</style>
      </div>
    );
  }
);
