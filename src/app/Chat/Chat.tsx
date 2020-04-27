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
import { ChatLeftNav } from "./ChatLeftNav";
import { ChatCardFooterUser, ChatCardFooterChannel } from "./ChatCardFooter";
import { ChatCardHeader } from "./ChatCardHeader";
import { observer } from "mobx-react";
import { ChatService } from "../ChatService";
import { ChatBodyUser } from "./ChatBody";

export const ChatScreen = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Chat" className="mb-5" />
        {/* START Content */}
        <Row>
          <Col lg={3} className="no-print">
            <ChatLeftNav />
          </Col>
          <Col lg={9}>
            <Card className="mb-0">
              {(!!service.selectedEmail || !!service.selectedChannel) && (
                <CardHeader className="d-flex bb-0 bg-white">
                  <ChatCardHeader />
                </CardHeader>
              )}
              {!!service.selectedEmail && <ChatBodyUser />}
              {!!service.selectedEmail && (
                <CardFooter>
                  <ChatCardFooterUser />
                </CardFooter>
              )}
              {!!service.selectedChannel && (
                <CardFooter>
                  <ChatCardFooterChannel />
                </CardFooter>
              )}
              {!service.selectedEmail && !service.selectedChannel && (
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
