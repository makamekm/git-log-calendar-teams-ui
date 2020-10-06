import React from "react";
import { useTransition, animated, interpolate, config } from "react-spring";
import classNames from "classnames";
import { observer, useLocalStore } from "mobx-react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useKeyPress } from "~/hooks";

export const Modal: React.FC<{
  className?: string;
  focusEl?: string;
  isOpen?: boolean;
  children?: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
  content: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
}> = observer(({ content, isOpen, children, className, focusEl }) => {
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);
  const ref = React.useRef<HTMLDivElement>(null);
  const state = useLocalStore(() => ({
    isOpen: false,
  }));
  const open = React.useCallback(() => {
    state.isOpen = true;
    setTimeout(() => {
      if (focusEl && ref.current) {
        const element = Array.from(ref.current.querySelectorAll(focusEl))[0];
        if (element) {
          (element as HTMLElement).focus();
        } else {
          ref.current.focus();
        }
      } else if (ref.current) {
        ref.current.focus();
      }
    }, 100);
  }, [state, focusEl]);
  const close = React.useCallback(() => {
    if (state.isOpen) {
      state.isOpen = false;
    }
  }, [state]);
  const closeBackdrop = React.useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        close();
      }
    },
    [close]
  );
  useKeyPress("Escape", () => {
    if (
      document.activeElement === document.body ||
      document.activeElement === ref.current
    ) {
      close();
    }
  });
  const isOpenState = isOpen || state.isOpen;

  const transitions = useTransition(isOpenState, null, {
    from: { opacity: 0, top: -50, scale: 0.9 },
    enter: { opacity: 1, top: 0, scale: 1.0 },
    leave: { opacity: 0, scale: 0.9 },
    config: config.stiff,
  });

  const controller = { open, close, isOpen: isOpenState };
  return (
    <>
      {!!children && children(controller)}

      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedDialogOverlay
              key={key}
              style={{ opacity: styles.opacity }}
              className="overlay"
              onDismiss={close}
              onClick={closeBackdrop}
            >
              <AnimatedDialogContent
                aria-label="Dialog"
                onClick={closeBackdrop}
                style={{
                  transform: interpolate(
                    [styles.scale, styles.top] as any,
                    (s, y) => `translateY(${y}px) scale(${s})`
                  ),
                }}
                className={classNames(
                  className,
                  "modal overflow-y-auto min-w-full flex flex-col items-center focus:outline-none"
                )}
              >
                {!!content && content(controller)}
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
      <style global jsx>{`
        .overlay[data-reach-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.6);
          overflow-x: hidden;
        }
        .modal[data-reach-dialog-content] {
          background-color: transparent;
        }
      `}</style>
    </>
  );
});
