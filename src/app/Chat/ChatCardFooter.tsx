import React from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "~/components";
import { observer } from "mobx-react";
import { ChatService } from "../ChatService";

export const ChatCardFooterUser = observer(() => {
  const service = React.useContext(ChatService);
  const isDisabled =
    !service.selectedEmail || !service.userMap[service.selectedEmail]?.online;
  return (
    <React.Fragment>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button
            color="secondary"
            outline
            disabled={isDisabled}
            style={{
              pointerEvents: isDisabled ? "none" : undefined,
            }}
          >
            <i className="fa fa-paperclip"></i>
          </Button>
        </InputGroupAddon>
        <Input
          disabled={isDisabled}
          placeholder={isDisabled ? "No one online..." : "Your message..."}
          value={
            isDisabled
              ? ""
              : service.channelMapText[service.selectedEmail] || ""
          }
          onChange={(e) => {
            service.channelMapText[service.selectedEmail] =
              e.currentTarget.value;
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              !isDisabled && service.sendMessage();
            }
          }}
        />
        <InputGroupAddon addonType="append">
          <Button
            disabled={isDisabled}
            color="primary"
            onClick={() => {
              !isDisabled && service.sendMessage();
            }}
            style={{
              pointerEvents: isDisabled ? "none" : undefined,
            }}
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </React.Fragment>
  );
});

export const ChatCardFooterChannel = observer(() => {
  const service = React.useContext(ChatService);
  const isDisabled =
    !service.selectedChannel ||
    !service.isChannelOnline(service.selectedChannel);
  return (
    <React.Fragment>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button
            color="secondary"
            outline
            disabled={isDisabled}
            style={{
              pointerEvents: isDisabled ? "none" : undefined,
            }}
          >
            <i className="fa fa-paperclip"></i>
          </Button>
        </InputGroupAddon>
        <Input
          disabled={isDisabled}
          placeholder={isDisabled ? "No one online..." : "Your message..."}
          value={
            isDisabled
              ? ""
              : service.channelMapText[service.selectedChannel] || ""
          }
          onChange={(e) => {
            service.channelMapText[service.selectedChannel] =
              e.currentTarget.value;
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              !isDisabled && service.sendMessage();
            }
          }}
        />
        <InputGroupAddon addonType="append">
          <Button
            disabled={isDisabled}
            color="primary"
            onClick={() => {
              !isDisabled && service.sendMessage();
            }}
            style={{
              pointerEvents: isDisabled ? "none" : undefined,
            }}
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </React.Fragment>
  );
});
