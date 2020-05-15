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
        await ipc.handlers.PRINT();
        state.isPrinting = false;
      }}
    >
      <i className="fa fa-print"></i>
      <style global jsx>{`
        body {
          opacity: ${state.isPrinting ? "0" : "1"};
        }
        body,
        .container {
          min-width: ${state.isPrinting ? "1024px !important" : "undefined"};
          width: ${state.isPrinting ? "1024px !important" : "undefined"};
          max-width: ${state.isPrinting ? "1024px !important" : "undefined"};
        }
      `}</style>
    </div>
  );
});
