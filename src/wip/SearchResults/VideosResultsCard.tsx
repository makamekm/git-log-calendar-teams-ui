/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import faker from "faker/locale/en_US";
import {
  Card,
  CardBody,
  Badge,
  Media,
  CardImg,
  AvatarAddonIcon,
  AvatarImage,
  HolderIconProvider,
} from "~/components";
import { randomArray, randomAvatar } from "~/utilities";

const status = ["warning", "danger", "success", "secondary"];
const stars = [
  <span key="stars5">
    <i className="fa fa-fw fa-star text-warning" />
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star text-warning"></i>
  </span>,
  <span key="stars4">
    <i className="fa fa-fw fa-star text-warning" />
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star-o"></i>
  </span>,
  <span key="stars4">
    <i className="fa fa-fw fa-star text-warning" />
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star-o"></i>
    <i className="fa fa-fw fa-star-o"></i>
  </span>,
  <span key="stars2">
    <i className="fa fa-fw fa-star text-warning" />
    <i className="fa fa-fw fa-star text-warning"></i>
    <i className="fa fa-fw fa-star-o"></i>
    <i className="fa fa-fw fa-star-o"></i>
    <i className="fa fa-fw fa-star-o"></i>
  </span>,
  <span key="stars1">
    <i className="fa fa-fw fa-star text-warning" />
    <i className="fa fa-fw fa-star-o"></i>
    <i className="fa fa-fw fa-star-o"></i>
    <i className="fa fa-fw fa-star-o"></i>
    <i className="fa fa-fw fa-star-o"></i>
  </span>,
];

const VideosResultsCard = () => (
  <React.Fragment>
    <Card className="mb-3">
      <div className="row">
        <div className="col-md-4">
          <HolderIconProvider iconChar="" size={32} width="100p" height={350}>
            <CardImg height="100px" />
          </HolderIconProvider>
        </div>
        <div className="col-md-8 py-2">
          <CardBody>
            <div>
              <a href="#" className="h6 mb-0">
                {faker.commerce.productName()}
              </a>
            </div>
            <div className="text-success mb-3">{faker.internet.url()}</div>
            <div className="mb-3">{faker.lorem.paragraph()}</div>
            <div>
              {randomArray(stars)} <span className="ml-2">16 Reviews</span>
            </div>
            <div className="mb-2">
              <Badge color="secondary" pill className="mr-1">
                {faker.internet.domainName()}
              </Badge>
              <Badge color="secondary" pill className="mr-1">
                {faker.internet.domainName()}
              </Badge>
              <Badge color="secondary" pill className="mr-1">
                {faker.internet.domainName()}
              </Badge>
            </div>
            <div>
              <Media>
                <Media left className="align-self-center mr-3">
                  <AvatarImage
                    size="sm"
                    src={randomAvatar()}
                    addOns={[
                      <AvatarAddonIcon
                        className="fa fa-circle"
                        color="white"
                        key="avatar-icon-bg"
                      />,
                      <AvatarAddonIcon
                        className="fa fa-circle"
                        color={randomArray(status)}
                        key="avatar-icon-fg"
                      />,
                    ]}
                  />
                </Media>
                <Media body>
                  <div className="mt-0">
                    {faker.name.firstName()} {faker.name.lastName()}
                  </div>
                </Media>
              </Media>
            </div>
          </CardBody>
        </div>
      </div>
    </Card>
  </React.Fragment>
);

export { VideosResultsCard };
