import React from "react";
import { Container, Row, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ProjectsLeftNav } from "~/wip/Projects/ProjectsLeftNav";
import { ProjectsSmHeader } from "~/wip/Projects/ProjectsSmHeader";
import { ProjectsList } from "./ProjectsList";
import { ProjectsGrid } from "./ProjectsGrid";

export const Projects = (props: { match?: any }) => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Projects" className="mb-5 mt-4" />
      <Row>
        <Col lg={3}>
          <ProjectsLeftNav />
        </Col>
        <Col lg={9}>
          <ProjectsSmHeader
            subTitle={
              props.match.params.type === "list"
                ? "Projects List"
                : "Projects Grid"
            }
            linkList="/apps/projects/list"
            linkGrid="/apps/projects/grid"
          />

          {props.match.params.type === "list" ? (
            <ProjectsList />
          ) : (
            <ProjectsGrid />
          )}
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);
