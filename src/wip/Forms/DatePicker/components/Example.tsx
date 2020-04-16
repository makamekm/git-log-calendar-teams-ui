import React from "react";
import { Row, Col, FormGroup, Label } from "~/components";

export const Example = ({
  title,
  exampleInput,
  children,
  no,
}: {
  exampleInput?: any;
  children?: string;
  title?: any;
  no?: any;
}) => (
  <Row>
    <Col sm={12}>
      <h6>
        {title}
        <span className="small ml-1 text-muted">#{no}</span>
      </h6>
    </Col>
    <Col md={12}>
      <FormGroup>
        <Label>Example</Label>
        <div>{exampleInput}</div>
      </FormGroup>
    </Col>
    <Col md={12}>
      <FormGroup>
        <Label>Code</Label>
        <pre>
          <code>{children}</code>
        </pre>
      </FormGroup>
    </Col>
  </Row>
);
