import React from "react";
import Toggle from "react-toggle";
import { observer } from "mobx-react";
import { List } from "react-content-loader";

import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "~/components";
import { ConfigurationState } from "./ConfigurationState";

export const ConfigurationForm = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion className="mb-3">
        <AccordionHeader className="h6 cursor-pointer">
          Preferences
          <span className="small ml-1 text-muted">#1.00</span>
        </AccordionHeader>
        <AccordionBody className="pb-0">
          {!state.config || state.isLoading ? (
            <List className="m-3" height="200px" width="100%" />
          ) : (
            <Form className="mt-3 mb-3">
              <FormGroup row>
                <Label sm={4}>Password</Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    onChange={(e) => {
                      state.config.password = e.currentTarget.value;
                    }}
                    value={state.config.password}
                    placeholder="Enter Password..."
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Default Branch</Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    onChange={(e) => {
                      state.config.branch = e.currentTarget.value;
                    }}
                    value={state.config.branch}
                    placeholder="Enter Default Branch..."
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Collect Function</Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    onChange={(e) => {
                      state.config.evaluateStr = e.currentTarget.value;
                    }}
                    value={String(state.config.evaluateStr)}
                    placeholder="Enter JS function..."
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Collect Interval</Label>
                <Col sm={8}>
                  <Input
                    type="number"
                    onChange={(e) => {
                      state.config.collectInterval = Number(
                        e.currentTarget.value
                      );
                    }}
                    value={state.config.collectInterval}
                    placeholder="Enter Minutes..."
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Only Registered Users</Label>
                <Col sm={8}>
                  <Toggle
                    checked={state.config.onlyRegistered}
                    onChange={() => {
                      state.config.onlyRegistered = !state.config
                        .onlyRegistered;
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Collect Messages</Label>
                <Col sm={8}>
                  <Toggle
                    checked={state.config.collectMessages}
                    onChange={() => {
                      state.config.collectMessages = !state.config
                        .collectMessages;
                    }}
                  />
                </Col>
              </FormGroup>
            </Form>
          )}
        </AccordionBody>
      </Accordion>
    );
  }
);
