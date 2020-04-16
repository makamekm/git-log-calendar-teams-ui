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
import { ChatLeft } from "~/wip/Chat/ChatLeft";
import { ChatRight } from "~/wip/Chat/ChatRight";
import { ChatLeftNav } from "~/wip/Chat/ChatLeftNav";
import { ChatCardFooter } from "~/wip/Chat/ChatCardFooter";
import { ChatCardHeader } from "~/wip/Chat/ChatCardHeader";

export const Chat = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Chat" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={3}>
          <ChatLeftNav />
        </Col>
        <Col lg={9}>
          <Card className="mb-3">
            <CardHeader className="d-flex bb-0 bg-white">
              <ChatCardHeader />
            </CardHeader>
            <CardBody>
              <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
              <ChatRight cardClassName="text-dark" />
              <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
              <ChatRight cardClassName="text-dark" />
              <div className="small mb-3 mt-4 text-center">Yesterday</div>
              <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
              <ChatRight cardClassName="text-dark" />
              <ChatLeft cardClassName="bg-gray-300 b-0 text-dark" />
            </CardBody>
            <CardFooter>
              <ChatCardFooter />
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {/* END Content */}
    </Container>
  </React.Fragment>
);
