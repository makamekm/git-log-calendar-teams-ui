import React from "react";
import { autorun, reaction } from "mobx";
import { debounce } from "underscore";

export const useIsDirty: <T extends {
  isDirty?: boolean;
}>(
  state: T,
  name: keyof T
) => void = (state, name) => {
  React.useEffect(() => {
    let json: string = null;
    return autorun(() => {
      const newJson = JSON.stringify(state[name]);
      if (json != null && json !== newJson) {
        state.isDirty = true;
      }
      json = newJson;
    });
  }, [state, name]);
};

export const useDelay: <T>(
  state: T,
  name: keyof T,
  newName: keyof T
) => void = (state, name, newName, delay = 500) => {
  React.useEffect(() => {
    const setValue = debounce((value) => (state[newName] = value), delay);
    return autorun(() => {
      setValue(state[name]);
    });
  }, [state, name, newName, delay]);
};

export const useOnChange: <T, K extends keyof T>(
  state: T,
  name: K,
  fn: (value?: any) => any,
  delay?: number
) => void = (state, name, fn, delay = 100) => {
  React.useEffect(
    () => reaction(() => [state[name]], debounce(fn, delay, false)),
    [state, name, fn, delay]
  );
};

export const useOnLoad: <T>(fn: () => any, delay?: number) => void = (
  fn,
  delay = 0
) => {
  React.useEffect(() => {
    if (delay) {
      setTimeout(() => fn(), delay);
    } else {
      fn();
    }
  }, [fn, delay]);
};
