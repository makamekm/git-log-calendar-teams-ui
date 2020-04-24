import React from "react";
import classNames from "classnames";
import { NavItem } from "~/components";
import { ipc } from "~/shared/ipc";
import { useLocalStore, observer } from "mobx-react";

export const NavbarCollect = observer(
  (props: { className?: string; style?: React.CSSProperties }) => {
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
      <NavItem {...props} className={classNames(props.className)}>
        <span
          className={classNames("cursor-pointer nav-link", {
            disabled: state.isCollecting,
            bounced: state.isCollecting,
          })}
          onClick={() => {
            ipc.handlers.COLLECT_STATS();
          }}
        >
          <i className="fas fa-sync"></i>
        </span>
      </NavItem>
    );
  }
);
