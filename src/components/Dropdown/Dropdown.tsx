import React from "react";
import { useTransition, animated } from "react-spring";
import classNames from "classnames";
import { observer, useLocalStore } from "mobx-react";
import { useClickOutside } from "~/hooks";

export const Dropdown: React.FC<{
  className?: string;
  title?: any;
}> = observer(({ title, children, className }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const state = useLocalStore(() => ({
    isOpen: false,
    isAnimation: false,
    timeout: null as number,
  }));
  const open = React.useCallback(() => {
    if (!state.isOpen) {
      window.clearTimeout(state.timeout);
      state.isAnimation = true;
      state.isOpen = true;
    }
  }, [state]);
  const tryToClose = React.useCallback(() => {
    if (ref.current && ref.current.querySelectorAll(":focus").length === 0) {
      state.isOpen = false;
      state.timeout = window.setTimeout(() => {
        state.isAnimation = false;
      }, 200);
    }
  }, [state, ref]);
  const tryToCloseTimeout = React.useCallback(() => {
    setTimeout(tryToClose, 100);
  }, [tryToClose]);
  useClickOutside(ref, tryToCloseTimeout);
  const transitions = useTransition(state.isOpen, null, {
    config: {
      duration: 100,
    },
    from: {
      position: "absolute",
      opacity: 0,
      transform: "scale(0.9)",
      right: 0,
    },
    enter: { opacity: 1, transform: "scale(1)", right: 0 },
    leave: { opacity: 0, transform: "scale(0.9)", right: 0 },
  });
  return (
    <div
      ref={ref}
      className={classNames(className, "relative", {
        "z-10": !state.isOpen,
        "z-20": state.isAnimation,
        "z-30": state.isOpen,
      })}
      onMouseLeave={tryToCloseTimeout}
    >
      <button
        onClick={open}
        onBlur={tryToCloseTimeout}
        className="whitespace-no-wrap	flex-inline flex-row items-center px-3 py-2 text-sm rounded-lg dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      >
        <span>{title}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className={classNames(
            "inline w-4 h-4 ml-1 transition-transform duration-200 transform no-print",
            { "rotate-180": state.isOpen, "rotate-0": !state.isOpen }
          )}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <div className="no-print absolute right-0 w-full mt-2 origin-top-right rounded-md border dark-mode:border-gray-700 shadow-lg w-full md:w-48 text-left">
                <div
                  className="flex flex-col w-full px-1 overflow-y-auto bg-white rounded-md dark-mode:bg-gray-900 text-gray-600 dark-mode:text-gray-200 focus:outline-none focus:shadow-outline"
                  tabIndex={0}
                  style={{ maxHeight: "300px" }}
                >
                  <div className="flex flex-col w-full py-1">{children}</div>
                </div>
              </div>
            </animated.div>
          )
      )}
    </div>
  );
});
