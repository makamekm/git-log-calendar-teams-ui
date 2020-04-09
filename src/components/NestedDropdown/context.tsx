import React from "react";

const { Consumer, Provider } = React.createContext<{
  openId: string;
  onOpen: (id: string) => null;
}>(null);

export { Consumer, Provider };
