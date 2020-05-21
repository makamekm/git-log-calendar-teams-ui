import React from "react";
import { useTransition, animated } from "react-spring";
import Highlighter from "react-highlight-words";
import classNames from "classnames";
import { useLocalStore, observer } from "mobx-react";
import { isEqual } from "lodash";
import { useClickOutside, useKeyPress, useDelay } from "~/hooks";

const LIMIT = 15;

export const Typeahead: React.FC<{
  className?: string;
  placeholder?: string;
  multiple?: boolean;
  minQuery?: number;
  allowNew?: boolean;
  showSelected?: boolean;
  autoFocus?: boolean;
  hideClear?: boolean;
  hideCaret?: boolean;
  selected?: string[];
  icon?: any;
  onChange?: (
    selected: string[],
    group?: {
      label: string;
      values: string[];
    } & any
  ) => void;
  options: (
    | string
    | ({
        label: string;
        values: string[];
      } & any)
  )[];
  onOpen?: () => void;
  onClose?: () => void;
}> = observer(
  ({
    className,
    placeholder,
    selected,
    autoFocus,
    multiple,
    onChange,
    hideClear,
    hideCaret,
    onOpen,
    onClose,
    icon,
    options,
    showSelected,
    minQuery,
    allowNew,
  }) => {
    const selectedRef = React.useRef<HTMLDivElement>(null);
    const ref = React.useRef<HTMLDivElement>(null);
    const refInput = React.useRef<HTMLInputElement>(null);
    const state = useLocalStore(() => ({
      isOpen: false,
      isAnimation: false,
      isInputFocused: false,
      timeout: null as number,
      cacheOptions: [] as any[],
      queryReact: "",
      query: "",
      get queryArr() {
        return state.query.split(/\W/gi);
      },
      get options() {
        let length = 0;
        const optionsStr: string[] = (state.cacheOptions.filter(
          (s) =>
            typeof s === "string" &&
            ((!showSelected && !selected.includes(s)) || showSelected) &&
            s.toLowerCase().includes(state.query.toLowerCase())
        ) as any[]).slice(0, LIMIT);
        length = optionsStr.length;
        const optionsGroups: {
          label: string;
          values: string[];
        }[] = (state.cacheOptions.filter((s) => typeof s !== "string") as any[])
          .map((g) => {
            let values = g.values.filter(
              (s) =>
                ((!showSelected && !selected.includes(s)) || showSelected) &&
                s.toLowerCase().includes(state.query.toLowerCase())
            );
            values = values.slice(0, Math.max(0, values.length - length));
            length += values.length;
            return {
              ...g,
              values,
            };
          })
          .filter((g) => g.values.length > 0);
        const optionsGroupsReduced = optionsGroups.reduce((arr, group) => {
          arr.push({
            key: "_g_" + group.label,
            label: group.label,
          });
          group.values.forEach((item) => {
            arr.push({
              key: "_g_" + group.label + "__" + item,
              value: item,
              group,
            });
          });
          return arr;
        }, []);
        return {
          strings: optionsStr,
          groups: optionsGroupsReduced,
        };
      },
      get hasNew() {
        return (
          allowNew &&
          !!state.query &&
          !selected.includes(state.query) &&
          !state.options.strings.find(
            (s) => s.toLowerCase() === state.query.toLowerCase()
          ) &&
          !state.options.groups.find(
            (s) => s.value.toLowerCase() === state.query.toLowerCase()
          )
        );
      },
      get isOpenCalc() {
        return (
          state.isOpen &&
          (!minQuery || (minQuery && state.query.length >= minQuery)) &&
          (state.options.strings.length > 0 ||
            state.options.groups.length > 0 ||
            state.hasNew)
        );
      },
    }));
    React.useEffect(() => {
      if (!isEqual(options, state.cacheOptions)) {
        state.cacheOptions = options;
      }
    }, [options, state]);
    useDelay(state, "queryReact", "query");
    const open = React.useCallback(() => {
      if (!state.isOpen) {
        window.clearTimeout(state.timeout);
        state.isAnimation = true;
        state.isOpen = true;
        onOpen && onOpen();
      }
    }, [state, onOpen]);
    const tryToClose = React.useCallback(() => {
      if (ref.current && ref.current.querySelectorAll(":focus").length === 0) {
        state.isOpen = false;
        state.timeout = window.setTimeout(() => {
          state.isAnimation = false;
        }, 200);
        onClose && onClose();
      }
    }, [state, ref, onClose]);
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
    const isHighlitedByEnter = React.useCallback(
      (index?: number) => {
        if (state.isInputFocused) {
          if (index == null) {
            return state.hasNew;
          } else {
            return !state.hasNew && index === 0;
          }
        }
        return false;
      },
      [state]
    );
    const transitions = useTransition(state.isOpenCalc, null, {
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
    const optionsStrTransitions = useTransition(
      state.options.strings,
      (item) => item,
      {
        config: (item) =>
          !state.options.strings.includes(item)
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
      }
    );
    const optionsGroupTransitions = useTransition(
      state.options.groups,
      (item) => item.key,
      {
        config: (item) =>
          !state.options.groups.includes(item)
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
      }
    );
    const hasNewTransitions = useTransition(state.hasNew, null, {
      config: () =>
        !state.hasNew
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
          "w-full flex flex-col items-center relative text-gray-800 dark-mode:text-gray-200",
          {
            "z-10": !state.isOpen,
            "z-20": state.isAnimation,
            "z-30": state.isOpen,
          }
        )}
      >
        <div
          className="w-full flex flex-col md:flex-row items-stretch border border-gray-200 bg-white dark-mode:text-white dark-mode:border-gray-700 dark-mode:bg-gray-800 rounded shadow-sm focus-within:shadow-outline"
          style={{ minHeight: "36px" }}
        >
          <div ref={selectedRef} className="relative flex flex-auto flex-wrap">
            {selectedTransitions.map(({ item, props, key }) => (
              <animated.div
                style={{
                  ...props,
                  maxWidth: selectedRef.current
                    ? `${selectedRef.current.clientWidth - 10}px`
                    : undefined,
                }}
                key={key}
                className="flex justify-center items-center max-w-xs m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300 dark-mode:border-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-800"
              >
                <div className="px-1 text-xs font-normal leading-none flex-initial ellipsis">
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
            <div className="flex-2 md:flex-1 flex justify-start items-center">
              {(multiple || selected.length === 0) && (
                <div className="flex-1 flex justify-start items-center">
                  {!!icon && (
                    <div className="absolute pl-3 pointer-events-none text-gray-700 dark-mode:text-gray-300">
                      {icon}
                    </div>
                  )}
                  <input
                    ref={refInput}
                    type="text"
                    autoComplete={"off"}
                    onFocus={() => {
                      open();
                      state.isInputFocused = true;
                    }}
                    onBlur={() => {
                      state.isInputFocused = false;
                      tryToCloseTimeout();
                    }}
                    value={state.queryReact}
                    onChange={(e) => {
                      state.queryReact = e.currentTarget.value;
                    }}
                    onKeyDown={onEnterInput}
                    placeholder={placeholder}
                    className={classNames(
                      "ellipsis flex-1 no-print bg-transparent py-1 pr-2 appearance-none outline-none h-full w-full text-gray-800 dark-mode:text-white",
                      {
                        "pl-10": !!icon,
                        "pl-3 md:pl-2": !icon && selected.length > 0,
                        "pl-3": !icon && selected.length === 0,
                      }
                    )}
                    style={{ minWidth: "100px", minHeight: "36px" }}
                  />
                </div>
              )}
            </div>
          </div>

          {!hideClear &&
            hasSelectionTransitions.map(
              ({ item, key, props }) =>
                item && (
                  <animated.div
                    key={key}
                    style={props}
                    className="flex flex-col items-stretch justify-center text-gray-600 dark-mode:text-gray-400"
                  >
                    <button
                      onClick={() => {
                        onChange([]);
                      }}
                      onBlur={tryToCloseTimeout}
                      style={{ minWidth: "40px", minHeight: "36px" }}
                      className="h-full border-l border-t md:border-t-0 flex flex-col items-stretch justify-center border-gray-200 dark-mode:border-gray-700 cursor-pointer outline-none hover:bg-red-100 focus:bg-red-100 hover:text-red-400 hover:text-red-400 focus:text-red-400 dark-mode:hover:text-red-200 dark-mode:focus:text-red-200 dark-mode:hover:bg-red-800 dark-mode:focus:bg-red-800 focus:outline-none"
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
          {!hideCaret && (
            <button
              onClick={open}
              onBlur={tryToCloseTimeout}
              style={{ minWidth: "40px", minHeight: "36px" }}
              className="text-gray-300 border-l border-t md:border-t-0 flex items-center justify-center border-gray-200 cursor-pointer text-gray-600 dark-mode:border-gray-700 dark-mode:text-gray-400 outline-none hover:bg-blue-100 focus:bg-blue-100 dark-mode:hover:bg-blue-700 dark-mode:focus:bg-blue-700 focus:outline-none"
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
                    {
                      "rotate-180": state.isOpenCalc,
                      "rotate-0": !state.isOpenCalc,
                    }
                  )}
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            </button>
          )}
        </div>

        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <div
                  className="no-print shadow-lg border left-0 right-0 w-full my-1 origin-top-right bg-white dark-mode:border-gray-700 dark-mode:bg-gray-900 w-full min-w-64 rounded overflow-y-auto"
                  style={{ maxHeight: "300px" }}
                >
                  <div className="flex flex-col w-full">
                    {hasNewTransitions.map(
                      ({ item, key, props }) =>
                        item && (
                          <animated.button
                            key={key}
                            style={props}
                            onClick={() => {
                              const item = state.query;
                              if (state.hasNew) {
                                onChange(
                                  multiple ? [...selected, item] : [item]
                                );
                                state.queryReact = "";
                              }
                              autoFocus
                                ? refInput.current && refInput.current.focus()
                                : document.activeElement &&
                                  (document.activeElement as HTMLElement)
                                    .blur &&
                                  (document.activeElement as HTMLElement).blur();
                            }}
                            onBlur={tryToCloseTimeout}
                            className="item cursor-pointer w-full border-gray-200 border-b hover:bg-blue-100 focus:bg-blue-100 dark-mode:border-gray-700 dark-mode:hover:bg-blue-900 dark-mode:focus:bg-blue-900 focus:outline-none"
                          >
                            <div
                              className={classNames(
                                "flex w-full items-center p-2 pl-2 border-transparent border-l-4 relative hover:border-blue-300",
                                {
                                  "border-gray-100 bg-gray-100 dark-mode:border-gray-700 dark-mode:bg-gray-700": isHighlitedByEnter(),
                                }
                              )}
                            >
                              <div className="w-full items-center flex">
                                <div className="mx-2 leading-6 ellipsis max-w-full">
                                  Add New:{" "}
                                  <span className="font-semibold">
                                    {state.query}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </animated.button>
                        )
                    )}
                    {optionsStrTransitions.map(({ item, key, props }) => {
                      index++;
                      return (
                        <animated.button
                          style={props}
                          key={key}
                          onClick={() => {
                            const index = selected.findIndex((s) => item === s);
                            if (index >= 0) {
                              onChange(selected.filter((s) => s !== item));
                            } else {
                              onChange(multiple ? [...selected, item] : [item]);
                            }
                            state.queryReact = "";
                            autoFocus
                              ? refInput.current && refInput.current.focus()
                              : document.activeElement &&
                                (document.activeElement as HTMLElement).blur &&
                                (document.activeElement as HTMLElement).blur();
                          }}
                          onBlur={tryToCloseTimeout}
                          className="item cursor-pointer w-full border-gray-200 border-b hover:bg-blue-100 focus:bg-blue-100 dark-mode:border-gray-700 dark-mode:hover:bg-blue-900 dark-mode:focus:bg-blue-900 focus:outline-none"
                        >
                          <div
                            className={classNames(
                              "flex w-full items-center p-2 pl-2 border-transparent border-l-4 relative hover:border-blue-300",
                              {
                                "border-gray-100 bg-gray-100 dark-mode:border-gray-700 dark-mode:bg-gray-700": isHighlitedByEnter(
                                  index
                                ),
                                "border-blue-300": !!selected.find(
                                  (s) => item === s
                                ),
                              }
                            )}
                          >
                            <div className="w-full items-center flex">
                              <div className="mx-2 leading-6 ellipsis max-w-full">
                                <Highlighter
                                  highlightClassName="font-semibold bg-transparent p-0 dark-mode:text-white"
                                  searchWords={state.queryArr}
                                  autoEscape
                                  textToHighlight={item}
                                />
                              </div>
                            </div>
                          </div>
                        </animated.button>
                      );
                    })}
                    {optionsGroupTransitions.map(({ item, key, props }) => {
                      if (item.label) {
                        return (
                          <animated.div
                            style={{ ...props, borderLeftColor: "transparent" }}
                            key={key}
                            className="flex w-full font-semibold items-center justify-left text-xs py-1 px-3 border-l-4 border-t-0 border-r-0 border-b-2 border-gray-300 dark-mode:border-gray-600 text-gray-800 dark-mode:text-gray-200"
                          >
                            {item.label}
                          </animated.div>
                        );
                      } else {
                        index++;
                        return (
                          <animated.button
                            style={props}
                            key={key}
                            onClick={() => {
                              const index = selected.findIndex(
                                (s) => item.value === s
                              );
                              if (index >= 0) {
                                onChange(
                                  selected.filter((s) => s !== item.value),
                                  item.group
                                );
                              } else {
                                onChange(
                                  multiple
                                    ? [...selected, item.value]
                                    : [item.value],
                                  item.group
                                );
                              }
                              state.queryReact = "";
                              autoFocus
                                ? refInput.current && refInput.current.focus()
                                : document.activeElement &&
                                  (document.activeElement as HTMLElement)
                                    .blur &&
                                  (document.activeElement as HTMLElement).blur();
                            }}
                            onBlur={tryToCloseTimeout}
                            className="item cursor-pointer w-full border-gray-200 border-b hover:bg-blue-100 focus:bg-blue-100 dark-mode:border-gray-700 dark-mode:hover:bg-blue-900 dark-mode:focus:bg-blue-900 focus:outline-none"
                          >
                            <div
                              className={classNames(
                                "flex w-full items-center p-2 pl-2 border-transparent border-l-4 relative hover:border-blue-300",
                                {
                                  "border-gray-100 bg-gray-100 dark-mode:border-gray-700 dark-mode:bg-gray-700": isHighlitedByEnter(
                                    index
                                  ),
                                  "border-blue-300": !!selected.find(
                                    (s) => item.value === s
                                  ),
                                }
                              )}
                            >
                              <div className="w-full items-center flex">
                                <div className="mx-2 leading-6 ellipsis max-w-full">
                                  <Highlighter
                                    highlightClassName="font-semibold bg-transparent p-0 dark-mode:text-white"
                                    searchWords={state.queryArr}
                                    autoEscape
                                    textToHighlight={item.value}
                                  />
                                </div>
                              </div>
                            </div>
                          </animated.button>
                        );
                      }
                    })}
                  </div>
                </div>
              </animated.div>
            )
        )}
      </div>
    );
  }
);
