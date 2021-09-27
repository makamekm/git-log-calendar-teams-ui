import React from "react";
import { autorun, reaction, isObservableArray, isObservable, toJS } from "mobx";
import localStorage from "mobx-localstorage";
import { debounce, isEqual } from "lodash";
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
) => void = (state, name, newName, delay = 200) => {
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
    (delay ? debounce((value) => fn(value), delay) : (value) => fn(value))(
      state[name]
    );
    return reaction(
      () => [state[name]],
      delay ? debounce(([value]) => fn(value), delay) : ([value]) => fn(value)
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
  delay = 0,
  disable?: boolean
) => {
  const key = storageName || (name as string);

  React.useEffect(() => {
    if (disable) {
      return;
    }
    return reaction(
      () => [state[name]],
      ([value]) => {
        const localValue = localStorage.getItem(key);
        if (!isObservableEquals(localValue, value)) {
          localStorage.setItem(key, value);
        }
      }
    );
  }, [state, name, key, delay, disable]);

  React.useEffect(() => {
    if (disable) {
      return;
    }
    const localValue = localStorage.getItem(key);
    setObservable(state, name, toJS(localValue));
    return reaction(
      () => [localStorage.getItem(key)],
      debounce(([localValue]) => {
        const value = state[name];
        if (!isObservableEquals(localValue, value)) {
          setObservable(state, name, localValue);
        }
      }, delay)
    );
  }, [state, name, key, delay, disable]);
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
      debounce(([localValue]) => {
        const value = state[name];
        if (!isObservableEquals(localValue, value)) {
          setObservable(state, name, localValue);
        }
      }, delay)
    );
  }, [state, name, key, delay]);
};

export function useClickOutside(ref, fn) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, fn]);
}

export function useKeyPress(targetKey, down?, up?) {
  const downHandler = React.useCallback(
    (e) => {
      if (e.key === targetKey) {
        down && down(e);
      }
    },
    [targetKey, down]
  );

  const upHandler = React.useCallback(
    (e) => {
      if (e.key === targetKey) {
        up && up(e);
      }
    },
    [targetKey, up]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]);
}
