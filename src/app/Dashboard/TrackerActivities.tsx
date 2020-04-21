/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { observer } from "mobx-react";
import { Instagram } from "react-content-loader";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "~/components";
import { CalendarActivities } from "./CalendarActivities";
import { DashboardService } from "./DashboardService";
import { FavouriteService } from "./FavouriteService";

export const TrackerActivities = observer(() => {
  const stateDashboard = React.useContext(DashboardService);
  const stateFavourite = React.useContext(FavouriteService);
  return (
    <>
      {stateFavourite.trackers &&
        stateFavourite.trackers.map((tracker) => {
          let stats: any = null;
          if (tracker.type === "team") {
            stats = stateDashboard.teamStats;
          } else if (tracker.type === "user") {
            stats = stateDashboard.userStats;
          } else if (tracker.type === "repository") {
            stats = stateDashboard.repositoriesStats;
          }
          return (
            <Row key={tracker.name + "__" + tracker.type}>
              <Col lg={12}>
                <Card className="mb-3">
                  <CardBody>
                    <div className="d-flex">
                      <CardTitle tag="h6">
                        <a href="#">
                          <strong>{tracker.name}</strong> Calendar Activity
                        </a>
                        <span className="small ml-1 text-muted">
                          #{tracker.type}
                        </span>
                      </CardTitle>

                      <UncontrolledButtonDropdown className="ml-auto">
                        <DropdownToggle
                          color="link"
                          className="text-decoration-none"
                        >
                          <i className="fa fa-gear"></i>
                          <i className="fa fa-angle-down ml-2"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            onClick={() => {
                              stateFavourite.removeTracker(
                                tracker.name,
                                tracker.type
                              );
                            }}
                          >
                            <i className="fa fa-fw fa-trash mr-2"></i>
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                    <div className="d-flex justify-content-center">
                      {stateDashboard.isLoadingDelay ||
                      stateFavourite.isLoadingDelay ? (
                        <Instagram height={"300px"} />
                      ) : (
                        stats[tracker.name] && (
                          <CalendarActivities
                            maxValue={stateDashboard.maxValue}
                            height={200}
                            data={stats[tracker.name]}
                            limit={stateDashboard.limit}
                          />
                        )
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        })}
    </>
  );
});
