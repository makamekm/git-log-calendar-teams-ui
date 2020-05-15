import React from "react";
import ReactDOM from "react-dom";
import { useTransition, animated } from "react-spring";
import classNames from "classnames";
import { observer, useLocalStore } from "mobx-react";
import { LayoutService } from "../Layout/LayoutService";
import { useKeyPress } from "~/hooks";

export const Modal: React.FC<{
  className?: string;
  focusEl?: string;
  children?: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
  content: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
}> = observer(({ content, children, className, focusEl }) => {
  const service = React.useContext(LayoutService);
  const ref = React.useRef<HTMLDivElement>(null);
  const state = useLocalStore(() => ({
    isOpen: false,
  }));
  const open = React.useCallback(() => {
    state.isOpen = true;
    service.nonScrollableStack++;
    setTimeout(() => {
      if (focusEl && ref.current) {
        const element = Array.from(ref.current.querySelectorAll(focusEl))[0];
        if (element) {
          (element as HTMLElement).focus();
        } else {
          ref.current.focus();
        }
      } else if (ref.current) {
        ref.current.focus();
      }
    }, 100);
  }, [state, service, focusEl]);
  const close = React.useCallback(() => {
    if (state.isOpen) {
      state.isOpen = false;
      service.nonScrollableStack--;
    }
  }, [state, service]);
  const closeBackdrop = React.useCallback(
    (e) => {
      if (ref.current && e.target && ref.current === e.target) {
        close();
      }
    },
    [close, ref]
  );
  useKeyPress("Escape", () => {
    if (
      document.activeElement === document.body ||
      document.activeElement === ref.current
    ) {
      close();
    }
  });
  React.useEffect(() => {
    return () => {
      if (state.isOpen) {
        service.nonScrollableStack--;
      }
    };
  }, [state, service]);
  const transitions = useTransition(state.isOpen, null, {
    config: {
      duration: 100,
    },
    from: {
      opacity: 0,
      position: "fixed",
      background: "rgba(0, 0, 0, 0.6)",
      left: 0,
      bottom: 0,
      top: 0,
      right: 0,
    },
    enter: {
      opacity: 1,
      position: "fixed",
      background: "rgba(0, 0, 0, 0.6)",
      left: 0,
      bottom: 0,
      top: 0,
      right: 0,
    },
    leave: {
      opacity: 0,
      position: "fixed",
      background: "rgba(0, 0, 0, 0.6)",
      left: 0,
      bottom: 0,
      top: 0,
      right: 0,
    },
  });
  const innerTransitions = useTransition(state.isOpen, null, {
    config: {
      duration: 100,
    },
    from: {
      transform: "scale(0.9)",
    },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0.9)" },
  });
  const controller = { open, close, isOpen: state.isOpen };
  return (
    <>
      {!!children && children(controller)}
      {ReactDOM.createPortal(
        transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} className={"z-10"} style={props}>
                {innerTransitions.map(
                  ({ item, key, props }) =>
                    item && (
                      <animated.div
                        tabIndex={0}
                        ref={ref}
                        key={key}
                        className={classNames(
                          className,
                          "min-h-screen max-h-screen overflow-y-auto min-w-full flex flex-col items-center xs:p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 focus:outline-none"
                        )}
                        style={props}
                        onClick={closeBackdrop}
                      >
                        <div>{!!content && content(controller)}</div>
                      </animated.div>
                    )
                )}
              </animated.div>
            )
        ),
        document.getElementById("root")
      )}
    </>
  );
});
