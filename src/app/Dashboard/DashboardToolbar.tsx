import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
import {
  ButtonToolbar,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "~/components";
import { DashboardState } from "./DashboardInterface";
import { periods } from "./Periods";

const PeriodValues = observer(({ state }: { state: DashboardState }) => {
  return (
    <>
      {Object.keys(periods).map((key: any) => {
        key = Number(key);
        return (
          <DropdownItem
            key={key}
            active={state.limit === key}
            onClick={() => {
              state.limit = key;
            }}
          >
            {periods[key]}
          </DropdownItem>
        );
      })}
    </>
  );
});

export const DashboardToolbar = observer(
  ({ state }: { state: DashboardState }) => {
    const now = moment().format("YYYY/MM/DD");
    const past = moment().subtract(state.limit, "days").format("YYYY/MM/DD");

    return (
      <ButtonToolbar className="ml-auto">
        <ButtonGroup className="align-self-start mr-2 mt-0 mb-3">
          <UncontrolledButtonDropdown className="ml-auto flex-column">
            <DropdownToggle
              color="link"
              className="text-right pl-0 text-decoration-none mb-2"
            >
              <i className="fa fa-calendar-o text-body mr-2"></i>
              {periods[state.limit]}
              <i className="fa fa-angle-down text-body ml-2" />
            </DropdownToggle>
            <div className="small">
              {past} to {now}
            </div>
            <DropdownMenu>
              <DropdownItem header>Select Period:</DropdownItem>
              <PeriodValues state={state} />
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
);
