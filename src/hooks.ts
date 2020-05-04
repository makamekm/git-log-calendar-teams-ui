import React from "react";
import { autorun, reaction, isObservableArray, isObservable, toJS } from "mobx";
import localStorage from "mobx-localstorage";
import { debounce, isEqual } from "underscore";
import { deepObserve } from "mobx-utils";
import { useLocation } from "react-router";

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
  newName: keyof T,
  delay?: number
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
  fn: (value?: T[K]) => any,
  delay?: number
) => void = (state, name, fn, delay = 100) => {
  React.useEffect(() => {
    (delay
      ? debounce((value) => fn(value), delay, false)
      : (value) => fn(value))(state[name]);
    return reaction(
      () => [state[name]],
      delay
        ? debounce(([value]) => fn(value), delay, false)
        : ([value]) => fn(value)
    );
  }, [state, name, fn, delay]);
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

export const useOnLoadPathname: <T>(fn: () => any, delay?: number) => void = (
  fn,
  delay = 0
) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (delay) {
      setTimeout(() => fn(), delay);
    } else {
      fn();
    }
  }, [fn, delay, pathname]);
};

export const setObservable = <T, K extends keyof T>(
  state: T,
  name: K,
  value: T[K]
) => {
  value = isObservable(value) ? toJS(value) : value;
  if (isObservableArray(state[name])) {
    if (value) {
      (state[name] as any).replace(value);
    }
  } else {
    state[name] = value;
  }
};

export const isObservableEquals = (a, b) => {
  return isEqual(toJS(a), toJS(b));
};

export const useSimpleSyncLocalStorage = <T, K extends keyof T>(
  state: T,
  name: K,
  storageName?: string,
  delay = 0
) => {
  const key = storageName || (name as string);

  React.useEffect(() => {
    return reaction(
      () => [state[name]],
      ([value]) => {
        const localValue = localStorage.getItem(key);
        if (!isObservableEquals(localValue, value)) {
          localStorage.setItem(key, value);
        }
      }
    );
  }, [state, name, key, delay]);

  React.useEffect(() => {
    const localValue = localStorage.getItem(key);
    setObservable(state, name, toJS(localValue));
    return reaction(
      () => [localStorage.getItem(key)],
      debounce(
        ([localValue]) => {
          const value = state[name];
          if (!isObservableEquals(localValue, value)) {
            setObservable(state, name, localValue);
          }
        },
        delay,
        false
      )
    );
  }, [state, name, key, delay]);
};

export const useSyncLocalStorage = <T, K extends keyof T>(
  state: T,
  name: K,
  storageName?: string,
  delay = 0
) => {
  const key = storageName || (name as string);

  React.useEffect(() => {
    return deepObserve(state[name], () => {
      const value = state[name];
      const localValue = localStorage.getItem(key);
      if (!isObservableEquals(localValue, value)) {
        localStorage.setItem(key, value);
      }
    });
  }, [state, name, key, delay]);

  React.useEffect(() => {
    const localValue = localStorage.getItem(key);
    setObservable(state, name, toJS(localValue));
    return reaction(
      () => [localStorage.getItem(key)],
      debounce(
        ([localValue]) => {
          const value = state[name];
          if (!isObservableEquals(localValue, value)) {
            setObservable(state, name, localValue);
          }
        },
        delay,
        false
      )
    );
  }, [state, name, key, delay]);
};
