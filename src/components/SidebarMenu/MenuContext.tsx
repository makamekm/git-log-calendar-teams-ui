import React from "react";

const MenuContext = React.createContext<{
  entries: any;
  addEntry: (entry) => {};
  updateEntry: (entry) => {};
  removeEntry: (entry) => {};
}>(null);

export { MenuContext };
