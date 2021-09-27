import React from "react";
import { useTransition, animated } from "react-spring";
import { observer } from "mobx-react";

export const AccordionToggle: React.FC<{
  className?: string;
  value?: boolean;
}> = observer(({ children, className, value }) => {
  const transitions = useTransition(value, null, {
    config: {
      duration: 100,
    },
    from: {
      opacity: 0,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className={className} key={key} style={props}>
              {children}
            </animated.div>
          )
      )}
    </>
  );
});
