/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from "react";
import classNames from "classnames";

const WizardStep = (props: {
  active?: boolean;
  complete?: boolean;
  disabled?: boolean;
  className?: string;
  id: string;
  onClick: () => void;
  icon?: any;
  successIcon?: any;
  children?: any;
}) => {
  const stepClass = classNames(
    {
      "wizard-step--active": props.active,
      "wizard-step--complete": props.complete,
      "wizard-step--disabled": props.disabled,
    },
    "wizard-step",
    props.className
  );

  return (
    <a
      href="javascript:;"
      className={stepClass}
      onClick={() => !props.disabled && props.onClick()}
    >
      <div className="wizard-step__icon">
        {!props.complete ? props.icon : props.successIcon}
      </div>
      <div className="wizard-step__content">{props.children}</div>
    </a>
  );
};

WizardStep.defaultProps = {
  successIcon: <i className="fa fa-check fa-fw"></i>,
  onClick: () => {},
};

export { WizardStep };
