import React from "react";
import classNames from "classnames";
import { ipc } from "~/shared/ipc";
import { useLocalStore, observer } from "mobx-react";

export const NavbarCollect = observer(
  ({ className }: { className?: string }) => {
    const state = useLocalStore(() => ({
      isCollecting: false,
      load: async () => {
        state.isCollecting = await ipc.handlers.IS_COLLECTING_STATS();
      },
    }));
    React.useEffect(() => {
      const unsubscribe = ipc.channels.ON_COLLECT_STATS((value) => {
        state.isCollecting = value;
      });
      return () => {
        unsubscribe();
      };
    }, [state]);
    React.useEffect(() => {
      state.load();
    }, [state]);
    return (
      <div
        className={classNames(className, {
          "pointer-events-none": state.isCollecting,
          bounced: state.isCollecting,
        })}
        onClick={() => {
          ipc.handlers.COLLECT_STATS();
        }}
      >
        <i className="fas fa-sync"></i>
      </div>
    );
  }
);
