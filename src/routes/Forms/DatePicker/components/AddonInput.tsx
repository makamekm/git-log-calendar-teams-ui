import React from "react";
import { InputGroup, InputGroupAddon, Input } from "~/components";

// eslint-disable-next-line react/display-name
const AddonInputFR = React.forwardRef<
  InputGroup,
  {
    onClick?: any;
    onChange?: any;
    value?: string;
    className?: string;
  }
>((props, ref) => (
  <InputGroup className={props.className}>
    <InputGroupAddon addonType="prepend">
      <i className="fa fa-calendar-o"></i>
    </InputGroupAddon>
    <Input
      onClick={props.onClick}
      onChange={props.onChange}
      value={props.value}
      ref={ref as any}
    />
  </InputGroup>
));

export { AddonInputFR as AddonInput };
