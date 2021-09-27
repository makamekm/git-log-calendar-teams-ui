import React from "react";
import classNames from "classnames";
import { useTransition, animated } from "react-spring";
import { observer, useLocalStore } from "mobx-react";
import { useSimpleSyncLocalStorage } from "~/hooks";

export const Accordion: React.FC<{
  className?: string;
  syncStorageName?: string;
  initialOpen?: boolean;
  title?: any;
}> = observer(
  ({ children, className, initialOpen, title, syncStorageName }) => {
    const state = useLocalStore(() => ({
      isOpen: initialOpen,
    }));
    useSimpleSyncLocalStorage(
      state,
      "isOpen",
      syncStorageName,
      0,
      !syncStorageName
    );
    const toggle = React.useCallback(() => {
      state.isOpen = !state.isOpen;
    }, [state]);
    const transitions = useTransition(state.isOpen, null, {
      config: {
        duration: 100,
      },
      from: {
        opacity: 0,
        transform: "scale(0.99)",
      },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0.99)" },
    });
    return (
      <div
        className={classNames(
          className,
          "mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner"
        )}
      >
        <div className="accordion-title flex items-center w-full font-semibold px-4 py-3 text-lg">
          <button
            onClick={toggle}
            className="mr-2 flex items-center justify-center w-8 h-8 rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className={classNames(
                "inline w-4 h-4 transition-transform duration-200 transform",
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
          {title}
        </div>
        <style jsx>{`
          .accordion-title
            > :global(.flex.justify-between:not(:first-child)
              > *:not(:first-child)) {
            ${state.isOpen ? "" : "display: none;"}
          }
        `}</style>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                {children}
              </animated.div>
            )
        )}
      </div>
    );
  }
);
