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
import { ChatLeftNavUser, ChatLeftNavChannel } from "./ChatLeftNav";
import { ChatCardFooterUser, ChatCardFooterChannel } from "./ChatCardFooter";
import { ChatCardHeaderUser, ChatCardHeaderChannel } from "./ChatCardHeader";
import { observer } from "mobx-react";
import { ChatService } from "../ChatService";
import { ChatBodyUser, ChatBodyChannel } from "./ChatBody";

export const ChatUserScreen = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <Container>
        {/* START Content */}
        <Row>
          <Col lg={3} className="no-print">
            <ChatLeftNavUser />
          </Col>
          <Col lg={9}>
            <Card className="mb-0">
              {!!service.selectedEmail && (
                <>
                  <CardHeader className="d-flex bb-0 bg-white chat-header">
                    <ChatCardHeaderUser />
                  </CardHeader>
                  <ChatBodyUser />
                  <CardFooter>
                    <ChatCardFooterUser />
                  </CardFooter>
                </>
              )}
              {!service.selectedEmail && (
                <CardBody className="d-flex justify-content-center">
                  <span>
                    {"<"} Select a User {">"}
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

export const ChatChannelScreen = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <Container>
        {/* START Content */}
        <Row>
          <Col lg={3} className="no-print">
            <ChatLeftNavChannel />
          </Col>
          <Col lg={9}>
            <Card className="mb-0">
              {!!service.selectedChannel && (
                <>
                  <CardHeader className="d-flex bb-0 bg-white chat-header">
                    <ChatCardHeaderChannel />
                  </CardHeader>
                  <ChatBodyChannel />
                  <CardFooter>
                    <ChatCardFooterChannel />
                  </CardFooter>
                </>
              )}
              {!service.selectedChannel && (
                <CardBody className="d-flex justify-content-center">
                  <span>
                    {"<"} Select a Channel {">"}
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
