import React from "react";
import { useTransition, animated } from "react-spring";
import Highlighter from "react-highlight-words";
import classNames from "classnames";
import { useLocalStore, observer } from "mobx-react";
import { useClickOutside, useKeyPress } from "~/hooks";

const LIMIT = 15;

export const Typeahead: React.FC<{
  className?: string;
  placeholder?: string;
  multiple?: boolean;
  minQuery?: number;
  allowNew?: boolean;
  showSelected?: boolean;
  autoFocus?: boolean;
  selected?: string[];
  onChange?: (selected: string[]) => void;
  options: (
    | string
    | {
        label: string;
        values: string[];
      }
  )[];
}> = observer(
  ({
    className,
    placeholder,
    options,
    selected,
    autoFocus,
    showSelected,
    minQuery,
    allowNew,
    multiple,
    onChange,
  }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const refInput = React.useRef<HTMLInputElement>(null);
    const state = useLocalStore(() => ({
      isOpen: false,
      isInputFocused: false,
      query: "",
      get queryArr() {
        return state.query.split(/\W/gi);
      },
    }));
    const tryToClose = React.useCallback(() => {
      if (ref.current && ref.current.querySelectorAll(":focus").length === 0) {
        state.isOpen = false;
      }
    }, [state, ref]);
    const tryToCloseTimeout = React.useCallback(() => {
      setTimeout(tryToClose, 100);
    }, [tryToClose]);
    useClickOutside(ref, tryToCloseTimeout);
    const onEnterInput = React.useCallback(
      (e) => {
        if (e.key === "Backspace") {
          if (selected.length > 0 && !state.query) {
            onChange(selected.slice(0, selected.length - 1));
          }
        } else if (e.key === "Enter") {
          const elements = Array.from(
            ref.current.querySelectorAll("button.item")
          );
          const element = elements[0];
          if (element) {
            (element as HTMLElement).click();
          }
        }
      },
      [onChange, state, selected]
    );
    useKeyPress("ArrowUp", (e) => {
      if (
        document.activeElement &&
        ref.current &&
        ref.current.contains(document.activeElement)
      ) {
        let cursor = false;
        const elements = Array.from(
          ref.current.querySelectorAll("button.item")
        ).reverse();
        let element = elements.find((element) => {
          if (element === document.activeElement) {
            cursor = true;
            return false;
          }
          return cursor;
        });
        if (!element && elements.length > 0 && cursor && refInput.current) {
          element = refInput.current;
        }
        if (element) {
          e.preventDefault();
          (element as HTMLElement).focus();
        }
      }
    });
    useKeyPress("ArrowDown", (e) => {
      if (
        document.activeElement &&
        ref.current &&
        ref.current.contains(document.activeElement)
      ) {
        let cursor = false;
        const elements = Array.from(
          ref.current.querySelectorAll("button.item")
        );
        let element = elements.find((element) => {
          if (element === document.activeElement) {
            cursor = true;
            return false;
          }
          return cursor;
        });
        if (!element && elements.length > 0 && !cursor) {
          element = elements[0];
        }
        if (element) {
          e.preventDefault();
          (element as HTMLElement).focus();
        }
      }
    });
    let length = 0;
    const optionsStr: string[] = (options.filter(
      (s) =>
        typeof s === "string" &&
        ((!showSelected && !selected.includes(s)) || showSelected) &&
        s.toLowerCase().includes(state.query.toLowerCase())
    ) as any[]).slice(0, LIMIT);
    length = optionsStr.length;
    const optionsGroups: {
      label: string;
      values: string[];
    }[] = (options.filter((s) => typeof s !== "string") as any[])
      .map((g) => {
        let values = g.values.filter(
          (s) =>
            ((!showSelected && !selected.includes(s)) || showSelected) &&
            s.toLowerCase().includes(state.query.toLowerCase())
        );
        values = values.slice(0, Math.max(0, length - values.length));
        length += values.length;
        return {
          ...g,
          values,
        };
      })
      .filter((g) => g.values.length > 0);
    const hasNew = allowNew && !!state.query && !selected.includes(state.query);
    const isHighlitedByEnter = React.useCallback(
      (index?: number) => {
        if (state.isInputFocused) {
          if (index == null) {
            return hasNew;
          } else {
            return !hasNew && index === 0;
          }
        }
        return false;
      },
      [state, hasNew]
    );
    const isOpen =
      state.isOpen &&
      (!minQuery || (minQuery && state.query.length >= minQuery)) &&
      (optionsStr.length > 0 || optionsGroups.length > 0 || hasNew);
    const transitions = useTransition(isOpen, null, {
      config: {
        duration: 100,
      },
      from: {
        position: "absolute",
        opacity: 0,
        transform: "scale(0.9)",
        right: 0,
        left: 0,
        top: "100%",
      },
      enter: {
        opacity: 1,
        transform: "scale(1)",
        right: 0,
        left: 0,
        top: "100%",
      },
      leave: {
        opacity: 0,
        transform: "scale(0.9)",
        right: 0,
        left: 0,
        top: "100%",
      },
    });
    const hasSelectionTransitions = useTransition(selected.length > 0, null, {
      config: {
        duration: 100,
      },
      from: {
        opacity: 0,
        transform: "scale(0.9)",
      },
      enter: {
        opacity: 1,
        transform: "scale(1)",
      },
      leave: {
        opacity: 0,
        transform: "scale(0.9)",
      },
    });
    const selectedTransitions = useTransition(selected, (item) => item, {
      config: (item) =>
        !selected.includes(item)
          ? { duration: 0 }
          : {
              duration: 100,
            },
      from: {
        opacity: 0,
        transform: "scale(0.9)",
      },
      enter: {
        opacity: 1,
        transform: "scale(1)",
      },
      leave: {
        opacity: 0,
        transform: "scale(0.9)",
      },
    });
    let index = -1;
    return (
      <div
        ref={ref}
        className={classNames(
          className,
          "w-full flex flex-col items-center relative z-10"
        )}
      >
        <div
          className="w-full flex items-stretch border border-gray-200 bg-white rounded shadow-sm"
          style={{ minHeight: "2.5rem" }}
        >
          <div className="flex flex-auto flex-wrap p-1">
            {selectedTransitions.map(({ item, props, key }) => (
              <animated.div
                style={props}
                key={item}
                className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300"
              >
                <div className="px-1 text-xs font-normal leading-none max-w-full flex-initial">
                  {item}
                </div>
                {multiple && (
                  <div className="-ml-2 flex flex-auto flex-row-reverse">
                    <button
                      onClick={() => {
                        onChange(selected.filter((s) => s !== item));
                        autoFocus &&
                          refInput.current &&
                          refInput.current.focus();
                      }}
                      onBlur={tryToCloseTimeout}
                      className="hover:text-red-400 focus:text-red-400 outline-none focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x cursor-pointer rounded-full w-4 h-4 ml-2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
              </animated.div>
            ))}
            <div className="flex-1">
              {(multiple || selected.length === 0) && (
                <input
                  ref={refInput}
                  onFocus={() => {
                    state.isOpen = true;
                    state.isInputFocused = true;
                  }}
                  onBlur={() => {
                    state.isInputFocused = false;
                    tryToCloseTimeout();
                  }}
                  value={state.query}
                  onChange={(e) => {
                    state.query = e.currentTarget.value;
                  }}
                  onKeyDown={onEnterInput}
                  placeholder={placeholder}
                  className="no-print bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  style={{ minWidth: "100px" }}
                />
              )}
            </div>
          </div>

          {hasSelectionTransitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div
                  key={key}
                  style={props}
                  className="flex flex-col items-stretch justify-center text-gray-600"
                >
                  <button
                    onClick={() => {
                      onChange([]);
                    }}
                    onBlur={tryToCloseTimeout}
                    className="w-10 h-full border-l flex flex-col items-stretch justify-center border-gray-200 cursor-pointer outline-none hover:bg-red-100 focus:bg-red-100 hover:text-red-400 focus:text-red-400 focus:outline-none"
                  >
                    <div className="flex-1 h-full flex items-center justify-center transition-transform duration-200 transform rotate-0 hover:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={classNames(
                          "feather feather-chevron-up w-4 h-4"
                        )}
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  </button>
                </animated.div>
              )
          )}

          <button
            onClick={() => {
              state.isOpen = true;
            }}
            onBlur={tryToCloseTimeout}
            className="text-gray-300 w-10 border-l flex items-center justify-center border-gray-200 cursor-pointer text-gray-600 outline-none hover:bg-teal-100 focus:bg-teal-100 focus:outline-none"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={classNames(
                  "feather feather-chevron-up w-4 h-4 transition-transform duration-200 transform",
                  { "rotate-180": isOpen, "rotate-0": !isOpen }
                )}
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </button>
        </div>

        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <div className="no-print shadow left-0 right-0 w-full my-1 origin-top-right bg-white w-full min-w-64 rounded overflow-y-auto">
                  <div className="flex flex-col w-full">
                    {hasNew && (
                      <button
                        onClick={() => {
                          const item = state.query;
                          if (hasNew) {
                            onChange(multiple ? [...selected, item] : [item]);
                            state.query = "";
                          }
                          autoFocus &&
                            refInput.current &&
                            refInput.current.focus();
                        }}
                        onBlur={tryToCloseTimeout}
                        className="item cursor-pointer w-full border-gray-200 rounded-t border-b hover:bg-teal-100 focus:bg-teal-100 focus:outline-none"
                      >
                        <div
                          className={classNames(
                            "flex w-full items-center p-2 pl-2 border-transparent border-l-4 relative hover:border-teal-300",
                            {
                              "border-gray-100 bg-gray-100": isHighlitedByEnter(),
                            }
                          )}
                        >
                          <div className="w-full items-center flex">
                            <div className="mx-2 leading-6">
                              Add New:{" "}
                              <span className="font-semibold">
                                {state.query}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    )}
                    {optionsStr.map((item) => {
                      index++;
                      return (
                        <button
                          key={item}
                          onClick={() => {
                            const index = selected.findIndex((s) => item === s);
                            if (index >= 0) {
                              onChange(selected.filter((s) => s !== item));
                            } else {
                              onChange(multiple ? [...selected, item] : [item]);
                            }
                            state.query = "";
                            autoFocus &&
                              refInput.current &&
                              refInput.current.focus();
                          }}
                          onBlur={tryToCloseTimeout}
                          className="item cursor-pointer w-full border-gray-200 rounded-t border-b hover:bg-teal-100 focus:bg-teal-100 focus:outline-none"
                        >
                          <div
                            className={classNames(
                              "flex w-full items-center p-2 pl-2 border-transparent border-l-4 relative hover:border-teal-300",
                              {
                                "border-gray-100 bg-gray-100": isHighlitedByEnter(
                                  index
                                ),
                                "border-teal-300": !!selected.find(
                                  (s) => item === s
                                ),
                              }
                            )}
                          >
                            <div className="w-full items-center flex">
                              <div className="mx-2 leading-6">
                                <Highlighter
                                  highlightClassName="font-semibold bg-transparent p-0"
                                  searchWords={state.queryArr}
                                  autoEscape
                                  textToHighlight={item}
                                />
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                    {optionsGroups.map((group) => (
                      <React.Fragment key={group.label}>
                        <div className="flex w-full items-center justify-left text-xs py-1 px-3 border-transparent border-l-4 text-gray-600 rounded-t border-b">
                          {group.label}
                        </div>
                        {group.values.map((item) => {
                          index++;
                          return (
                            <button
                              key={item}
                              onClick={() => {
                                const index = selected.findIndex(
                                  (s) => item === s
                                );
                                if (index >= 0) {
                                  onChange(selected.filter((s) => s !== item));
                                } else {
                                  onChange(multiple ? [...selected, item] : []);
                                }
                                state.query = "";
                                autoFocus &&
                                  refInput.current &&
                                  refInput.current.focus();
                              }}
                              onBlur={tryToCloseTimeout}
                              className="item cursor-pointer w-full border-gray-200 rounded-t border-b hover:bg-teal-100 focus:bg-teal-100 focus:outline-none"
                            >
                              <div
                                className={classNames(
                                  "flex w-full items-center p-2 pl-2 border-transparent border-l-4 relative hover:border-teal-300",
                                  {
                                    "border-gray-100 bg-gray-100": isHighlitedByEnter(
                                      index
                                    ),
                                    "border-teal-300": !!selected.find(
                                      (s) => item === s
                                    ),
                                  }
                                )}
                              >
                                <div className="w-full items-center flex">
                                  <div className="mx-2 leading-6">{item}</div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </animated.div>
            )
        )}
      </div>
    );
  }
);
