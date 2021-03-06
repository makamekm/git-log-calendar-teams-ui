import React from "react";
import classNames from "classnames";
import { ipc } from "~/shared/ipc";
import { useLocalStore, observer } from "mobx-react";

export const NavbarPrint = observer(({ className }: { className?: string }) => {
  const state = useLocalStore(() => ({
    isPrinting: false,
  }));
  return (
    <div
      className={classNames(className)}
      onClick={async () => {
        state.isPrinting = true;
        if (window.isElectron) {
          await ipc.handlers.PRINT();
        } else {
          await new Promise((r) => setTimeout(r, 1000));
          await window.print();
          await new Promise((r) => setTimeout(r, 1000));
        }
        state.isPrinting = false;
      }}
    >
      <i className="fa fa-print"></i>
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
});
