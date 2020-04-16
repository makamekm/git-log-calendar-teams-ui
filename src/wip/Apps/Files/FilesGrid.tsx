import React from "react";
import { CardColumns } from "~/components";
import { FilesCardGrid } from "~/wip/Files/FilesCardGrid";
import { Paginations } from "~/wip/Paginations";

export const FilesGrid = () => (
  <React.Fragment>
    <CardColumns>
      <FilesCardGrid />
      <FilesCardGrid />
      <FilesCardGrid />
      <FilesCardGrid />
      <FilesCardGrid />
      <FilesCardGrid />
      <FilesCardGrid />
      <FilesCardGrid />
      <FilesCardGrid />
    </CardColumns>
    <div className="d-flex justify-content-center">
      <Paginations />
    </div>
  </React.Fragment>
);
