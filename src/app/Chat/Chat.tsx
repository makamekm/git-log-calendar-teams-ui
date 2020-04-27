import React from "react";
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
            <Card className="mb-3">
              <CardHeader className="d-flex bb-0 bg-white">
                <ChatCardHeader state={state} />
              </CardHeader>
              <CardBody>
                {!!state.selectedEmail &&
                  service.userMessages[state.selectedEmail] && (
                    <>
                      {service.userMessages[state.selectedEmail].map(
                        (message, index) => {
                          if (message.type === "text") {
                            if (message.email === service.self) {
                              return (
                                <ChatLeft
                                  cardClassName="text-dark"
                                  text={message.text}
                                  date={message.timestamp}
                                  author={message.email}
                                />
                              );
                            } else {
                              return (
                                <ChatRight
                                  cardClassName="text-dark"
                                  text={message.text}
                                  date={message.timestamp}
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
                {/* <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
                <ChatRight cardClassName="text-dark" />
                <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
                <ChatRight cardClassName="text-dark" />
                <div className="small mb-3 mt-4 text-center">Yesterday</div>
                <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
                <ChatRight cardClassName="text-dark" />
                <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" /> */}
              </CardBody>
              <CardFooter>
                <ChatCardFooter state={state} />
              </CardFooter>
            </Card>
          </Col>
        </Row>
        {/* END Content */}
      </Container>
    </React.Fragment>
  );
});
