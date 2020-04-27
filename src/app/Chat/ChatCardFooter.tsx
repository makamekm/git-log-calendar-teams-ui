import React from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "~/components";
import { observer } from "mobx-react";
import { ChatScreenState } from "./Chat";
import { ChatService } from "../ChatService";

export const ChatCardFooter = observer(
  ({ state }: { state: ChatScreenState }) => {
    const service = React.useContext(ChatService);
    return (
      <React.Fragment>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="secondary" outline>
              <i className="fa fa-paperclip"></i>
            </Button>
          </InputGroupAddon>
          <Input
            disabled={!state.selectedEmail}
            placeholder="Your message..."
            value={state.selectedEmail ? state.text : ""}
            onChange={(e) => {
              state.text = e.currentTarget.value;
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                if (state.selectedEmail) {
                  service.sendUser(state.selectedEmail, state.text);
                  state.text = "";
                }
              }
            }}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              onClick={() => {
                if (state.selectedEmail) {
                  service.sendUser(state.selectedEmail, state.text);
                  state.text = "";
                }
              }}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </React.Fragment>
    );
  }
);
