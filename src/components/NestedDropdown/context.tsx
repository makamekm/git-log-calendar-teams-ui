import React from "react";
import { VersionSelector } from "~/app/VersionSelector";

const { Consumer, Provider } = React.createContext<{
  openId: string;
  onOpen: (id: string) => VersionSelector;
}>(null);

export { Consumer, Provider };
