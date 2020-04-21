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
  Input,
} from "~/components";
import { periods } from "./Periods";
import { DashboardState } from "./DashboardService";

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
      <div className="d-flex flex-wrap justify-content-end ml-auto">
        <div className="flex-column pr-4 mt-2 mb-2">
          <Input
            className="no-print mb-2"
            placeholder="Activity Max Value"
            type="number"
            value={state.maxValue}
            style={{
              width: "150px",
              minWidth: "150px",
            }}
            onChange={(e) => {
              state.maxValue = Number(e.currentTarget.value);
            }}
          />
          <div className="small">
            Activity max value: <strong>{state.maxValue || "auto"}</strong>
          </div>
        </div>
        <ButtonToolbar className="mt-2 mb-2">
          <ButtonGroup
            className="align-self-start mr-2 mt-0 mb-3"
            style={{
              minWidth: "150px",
            }}
          >
            <UncontrolledButtonDropdown className="flex-column">
              <DropdownToggle
                color="link"
                className="no-print text-right pl-0 text-decoration-none mb-2"
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
      </div>
    );
  }
);
