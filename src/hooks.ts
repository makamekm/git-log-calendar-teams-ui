import React from "react";
import { autorun } from "mobx";
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
