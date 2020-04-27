import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import {
  Container,
  Row,
  CardBody,
  Col,
  CardHeader,
  Card,
  CardFooter,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ChatLeft } from "./ChatLeft";
import { ChatRight } from "./ChatRight";
import { ChatLeftNav } from "./ChatLeftNav";
import { ChatCardFooter } from "./ChatCardFooter";
import { ChatCardHeader } from "./ChatCardHeader";
import { observer, useLocalStore } from "mobx-react";
import { ChatService } from "../ChatService";

export interface ChatScreenState {
  selectedEmail: string;
  text: string;
}

export const ChatScreen = observer(() => {
  const state = useLocalStore<ChatScreenState>(() => ({
    selectedEmail: null,
    text: "",
  }));
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Chat" className="mb-5" />
        {/* START Content */}
        <Row>
          <Col lg={3}>
            <ChatLeftNav state={state} />
          </Col>
          <Col lg={9}>
            <Card className="mb-0">
              {!!state.selectedEmail && (
                <CardHeader className="d-flex bb-0 bg-white">
                  <ChatCardHeader state={state} />
                </CardHeader>
              )}
              {!!state.selectedEmail && (
                <ScrollToBottom className={"chat-box"}>
                  {(!service.userMessages[state.selectedEmail] ||
                    service.userMessages[state.selectedEmail].length === 0) && (
                    <div className="d-flex justify-content-center pt-2 pb-4">
                      <span>
                        {"<"} No Messages {">"}
                      </span>
                    </div>
                  )}
                  <div className="px-3">
                    {service.userMessages[state.selectedEmail] && (
                      <>
                        {service.userMessages[state.selectedEmail].map(
                          (message, index) => {
                            if (message.type === "text") {
                              if (message.email === service.self) {
                                return (
                                  <ChatRight
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
                                    cardClassName="text-dark"
                                    text={message.text}
                                    online={
                                      service.userMap[message.email]?.online
                                    }
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
                  {/* <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
                <ChatRight cardClassName="text-dark" />
                <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
                <ChatRight cardClassName="text-dark" />
                <div className="small mb-3 mt-4 text-center">Yesterday</div>
                <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
                <ChatRight cardClassName="text-dark" />
                <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" /> */}
                </ScrollToBottom>
              )}
              {!!state.selectedEmail && (
                <CardFooter>
                  <ChatCardFooter state={state} />
                </CardFooter>
              )}
              {!state.selectedEmail && (
                <CardBody className="d-flex justify-content-center">
                  <span>
                    {"<"} Select Chat Room {">"}
                  </span>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        {/* END Content */}
      </Container>
    </React.Fragment>
  );
});
