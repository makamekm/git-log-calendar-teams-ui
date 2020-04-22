import React from "react";
import { observer } from "mobx-react";
import { Instagram } from "react-content-loader";
import { groupBy } from "underscore";

import {
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
import { Link } from "react-router-dom";
import { HeaderSection } from "../HeaderSection";

export const TrackerActivities = observer(() => {
  const stateDashboard = React.useContext(DashboardService);
  const stateFavourite = React.useContext(FavouriteService);
  const groupped: {
    user?: {
      name: string;
    }[];
    repository?: {
      name: string;
    }[];
    team?: {
      name: string;
    }[];
  } = stateFavourite.trackers ? groupBy(stateFavourite.trackers, "type") : {};
  return (
    <>
      {groupped.user?.length > 0 && (
        <HeaderSection
          no="Users"
          title="#user"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {groupped.user?.map(({ name }, index) => (
        <Card className="mb-3" key={index}>
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                <Link to={`/user/${name}`}>
                  <i className="fa fa-link mr-1"></i>
                  <strong>{name}</strong>
                </Link>
                <span className="small ml-1 text-muted">#user</span>
              </CardTitle>

              <UncontrolledButtonDropdown className="ml-auto">
                <DropdownToggle color="link" className="text-decoration-none">
                  <i className="fa fa-gear"></i>
                  <i className="fa fa-angle-down ml-2"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      stateFavourite.removeTracker(name, "user");
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
                <CalendarActivities
                  maxValue={stateDashboard.maxValue}
                  height={200}
                  limit={stateDashboard.limit}
                  data={stateDashboard.userStats[name] || []}
                />
              )}
            </div>
          </CardBody>
        </Card>
      ))}

      {groupped.team?.length > 0 && (
        <HeaderSection
          no="Teams"
          title="#team"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {groupped.team?.map(({ name }, index) => (
        <Card className="mb-3" key={index}>
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                <Link to={`/team/${name}`}>
                  <i className="fa fa-link mr-1"></i>
                  <strong>{name}</strong>
                </Link>
                <span className="small ml-1 text-muted">#team</span>
              </CardTitle>

              <UncontrolledButtonDropdown className="ml-auto">
                <DropdownToggle color="link" className="text-decoration-none">
                  <i className="fa fa-gear"></i>
                  <i className="fa fa-angle-down ml-2"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      stateFavourite.removeTracker(name, "team");
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
                <CalendarActivities
                  maxValue={stateDashboard.maxValue}
                  height={200}
                  limit={stateDashboard.limit}
                  data={stateDashboard.teamStats[name] || []}
                />
              )}
            </div>
          </CardBody>
        </Card>
      ))}

      {groupped.repository?.length > 0 && (
        <HeaderSection
          no="Repositories"
          title="#repository"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {groupped.repository?.map(({ name }, index) => (
        <Card className="mb-3" key={index}>
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                <Link to={`/repository/${name}`}>
                  <i className="fa fa-link mr-1"></i>
                  <strong>{name}</strong>
                </Link>
                <span className="small ml-1 text-muted">#repository</span>
              </CardTitle>

              <UncontrolledButtonDropdown className="ml-auto">
                <DropdownToggle color="link" className="text-decoration-none">
                  <i className="fa fa-gear"></i>
                  <i className="fa fa-angle-down ml-2"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      stateFavourite.removeTracker(name, "repository");
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
                <CalendarActivities
                  maxValue={stateDashboard.maxValue}
                  height={200}
                  limit={stateDashboard.limit}
                  data={stateDashboard.repositoriesStats[name] || []}
                />
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
});
