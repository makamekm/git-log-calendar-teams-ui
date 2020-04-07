import React from "react";
import classNames from "classnames";
import { CustomInput as RSCustomInput, CustomInputProps } from "reactstrap";

const CustomInput = (props: CustomInputProps) => {
  const { className, ...otherProps } = props;
  const inputClass = classNames(className, {
    "custom-control-empty": !props.label,
  });

  return <RSCustomInput className={inputClass} {...otherProps} />;
};

export { CustomInput };
