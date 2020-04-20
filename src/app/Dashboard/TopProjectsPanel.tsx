import React from "react";
import { Media } from "~/components";
import { TinyDonutChart } from "~/wip/ProjectsDashboards/TinyDonutChart";

export const TopProjectsPanel = () => {
  return (
    <>
      <div className="hr-text hr-text-left my-2">
        <span>Top 4 Projects</span>
      </div>
      <Media>
        <Media left className="mr-3">
          <TinyDonutChart />
        </Media>
        <Media body>
          <div>
            <i className="fa fa-circle mr-1 text-yellow"></i>
            <span className="text-inverse">23</span> Pending
          </div>
          <div>
            <i className="fa fa-circle mr-1 text-danger"></i>
            <span className="text-inverse">3</span> Behind
          </div>
          <div>
            <i className="fa fa-circle mr-1 text-success"></i>
            <span className="text-inverse">34</span> Completed
          </div>
          <div>
            <i className="fa fa-circle mr-1 text-primary"></i>
            <span className="text-inverse">24</span> Behind
          </div>
        </Media>
      </Media>
    </>
  );
};
