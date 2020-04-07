import React from "react";

const { Provider, Consumer } = React.createContext<{
  toggleModal: () => void;
}>(null);

export { Provider, Consumer };
