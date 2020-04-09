import React from "react";
import { Button } from "~/components";

// eslint-disable-next-line react/display-name
const ButtonInputFR = React.forwardRef<
  Button,
  {
    onClick?: any;
    value?: string;
  }
>((props, ref) => (
  <Button outline onClick={props.onClick} ref={ref}>
    <i className="fa fa-fw fa-calendar-o mr-1" />
    {props.value}
  </Button>
));

export { ButtonInputFR as ButtonInput };
