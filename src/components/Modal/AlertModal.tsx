import React from "react";
import { observer } from "mobx-react";
import FocusTrap from "focus-trap-react";
import { Modal } from "./Modal";
import { useKeyPress } from "~/hooks";

const AlertModalContent: React.FC<{
  accept: () => void;
  close: () => void;
  title: any;
  text: any;
}> = ({ accept, close, title, text }) => {
  const onAccept = React.useCallback(() => {
    accept();
    close();
  }, [close, accept]);
  useKeyPress("Escape", () => {
    close();
  });
  return (
    <FocusTrap>
      <div className="window bg-red-100 rounded-lg shadow-md text-gray-700 p-10 flex flex-col items-center">
        <i className="fas fa-exclamation-triangle fa-4x modal-icon text-red-600"></i>
        <div className="text-3xl mt-4 text-red-600">{title}</div>
        <div className="text-xl mt-3">{text}</div>
        <div className="flex-1 mt-3 -mx-2 -mb-2 flex flex-row flex-wrap items-center justify-around w-full">
          <button
            className={
              "accept text-base font-semibold py-2 px-3 m-2 rounded-lg bg-red-600 active:bg-red-700 text-white hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }
            onClick={onAccept}
          >
            Apply
          </button>
          <button
            className={
              "cancel text-base font-normal border py-2 px-3 m-2 rounded-lg text-gray-700 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            }
            onClick={close}
          >
            Cancel
          </button>
        </div>
        <style jsx>{`
          .window {
            min-width: 40vw;
          }
        `}</style>
      </div>
    </FocusTrap>
  );
};

export const AlertModal: React.FC<{
  className?: string;
  accept: () => void;
  children?: (props: {
    open: () => void;
    close: () => void;
    isOpen: boolean;
  }) => JSX.Element;
  title: any;
  text: any;
}> = observer(({ text, title, children, accept, className }) => {
  return (
    <Modal
      className={className}
      focusEl=".accept"
      content={({ close }) => (
        <AlertModalContent
          close={close}
          text={text}
          title={title}
          accept={accept}
        />
      )}
    >
      {children}
    </Modal>
  );
});
