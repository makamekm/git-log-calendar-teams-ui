import React from "react";
import { Modal } from "./Modal";
import { AlertModalContent } from "./AlertModal";
import { useHistory } from "react-router-dom";

export const useChangeRouteAlertModal = (shouldCheck: boolean) => {
  const history = useHistory();
  const [approveState, setApproveState] = React.useState(() => ({
    shouldBlock: true,
    isOpen: false,
    location: null as any,
  }));
  React.useEffect(() => {
    const currentPathname = history.location.pathname;
    return history.block((location) => {
      if (
        shouldCheck &&
        approveState.shouldBlock &&
        location.pathname !== currentPathname
      ) {
        setApproveState({
          ...approveState,
          isOpen: true,
          location,
        });
        return false;
      }
    });
  }, [approveState, history, shouldCheck]);
  const onCancelApprove = React.useCallback(() => {
    setApproveState({
      ...approveState,
      isOpen: false,
    });
  }, [setApproveState, approveState]);
  const onOkApprove = React.useCallback(() => {
    approveState.shouldBlock = false;
    history.push(approveState.location);
  }, [approveState, history]);

  return (
    <Modal
      isOpen={approveState.isOpen}
      focusEl=".accept"
      content={() => (
        <AlertModalContent
          close={onCancelApprove}
          title="Unsaved Changes"
          text="You have unsaved changes. Do you want to continue?"
          accept={onOkApprove}
        />
      )}
    />
  );
};
