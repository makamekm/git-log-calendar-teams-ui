import React from "react";
import { Container, Row, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { FilesLeftNav } from "~/app/Files/FilesLeftNav";
import { ProjectsSmHeader } from "~/app/Projects/ProjectsSmHeader";
import { FilesList } from "./FilesList";
import { FilesGrid } from "./FilesGrid";

export const Files = (props: { match: any }) => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Files" className="mb-5 mt-4" />
      <Row>
        <Col lg={3}>
          <FilesLeftNav />
        </Col>
        <Col lg={9}>
          <ProjectsSmHeader
            subTitle={
              props.match.params.type === "list" ? "Files List" : "Files Grid"
            }
            linkList="/apps/files/list"
            linkGrid="/apps/files/grid"
          />

          {props.match.params.type === "list" ? <FilesList /> : <FilesGrid />}
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);
