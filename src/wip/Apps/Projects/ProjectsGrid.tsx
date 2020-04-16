import React from "react";
import _ from "lodash";
import { CardColumns } from "~/components";
import { ProjectsCardGrid } from "~/wip/Projects/ProjectsCardGrid";
import { Paginations } from "~/wip/Paginations";

export const ProjectsGrid = () => (
  <React.Fragment>
    <CardColumns>
      {_.times(12, (index) => (
        <ProjectsCardGrid key={index} />
      ))}
    </CardColumns>
    <div className="d-flex justify-content-center">
      <Paginations />
    </div>
  </React.Fragment>
);
