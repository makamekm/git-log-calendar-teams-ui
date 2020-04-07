import React from "react";

const {
  Provider: AccordionProvider,
  Consumer: AccordionConsumer,
} = React.createContext<{
  onToggle: () => void;
  isOpen: boolean;
}>(null);

export { AccordionProvider, AccordionConsumer };
