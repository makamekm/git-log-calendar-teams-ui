import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import { ChatLeft } from "./ChatLeft";
import { ChatRight } from "./ChatRight";
import { observer } from "mobx-react";
import { ChatService } from "../ChatService";

export const ChatBodyUser = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <ScrollToBottom className={"chat-box"}>
        {(!service.userMessages[service.selectedEmail] ||
          service.userMessages[service.selectedEmail].length === 0) && (
          <div className="d-flex justify-content-center pt-4 pb-3">
            <span>
              {"<"} No Messages {">"}
            </span>
          </div>
        )}
        <div className="px-3">
          {service.userMessages[service.selectedEmail] && (
            <>
              {service.userMessages[service.selectedEmail].map(
                (message, index) => {
                  if (message.type === "text") {
                    if (message.email === service.self) {
                      return (
                        <ChatRight
                          key={index}
                          cardClassName="bg-gray-200 text-dark"
                          text={message.text}
                          online
                          date={moment(message.timestamp).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                          author={message.email}
                        />
                      );
                    } else {
                      return (
                        <ChatLeft
                          key={index}
                          cardClassName="text-dark bg-gray-100"
                          text={message.text}
                          online={service.userMap[message.email]?.online}
                          date={moment(message.timestamp).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                          author={message.email}
                        />
                      );
                    }
                  }
                  return <React.Fragment key={index} />;
                }
              )}
            </>
          )}
        </div>
      </ScrollToBottom>
    </React.Fragment>
  );
});

export const ChatBodyChannel = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <ScrollToBottom className={"chat-box"}>
        {(!service.channelMessages[service.selectedChannel] ||
          service.channelMessages[service.selectedChannel].length === 0) && (
          <div className="d-flex justify-content-center pt-4 pb-3">
            <span>
              {"<"} No Messages {">"}
            </span>
          </div>
        )}
        <div className="px-3">
          {service.channelMessages[service.selectedChannel] && (
            <>
              {service.channelMessages[service.selectedChannel].map(
                (message, index) => {
                  if (message.type === "text") {
                    if (message.email === service.self) {
                      return (
                        <ChatRight
                          key={index}
                          cardClassName="bg-gray-200 text-dark"
                          text={message.text}
                          online
                          date={moment(message.timestamp).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                          author={message.email}
                        />
                      );
                    } else {
                      return (
                        <ChatLeft
                          key={index}
                          cardClassName="text-dark"
                          text={message.text}
                          online={service.userMap[message.email]?.online}
                          date={moment(message.timestamp).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                          author={message.email}
                        />
                      );
                    }
                  }
                  return <React.Fragment key={index} />;
                }
              )}
            </>
          )}
        </div>
      </ScrollToBottom>
    </React.Fragment>
  );
});
