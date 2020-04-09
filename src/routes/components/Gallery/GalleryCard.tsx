/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import faker from "faker/locale/en_US";
import {
  Card,
  CardImg,
  Media,
  CustomInput,
  UncontrolledTooltip,
  Badge,
  CardBody,
  HolderIconProvider,
  AvatarImage,
  AvatarAddonIcon,
} from "@lib";
import { randomArray, randomAvatar } from "~/utilities";

const status = ["success", "danger", "warning", "secondary"];
const badges = ["secondary"];

const GalleryCard = (props: { id?: string }) => (
  <React.Fragment>
    {/* START Card */}
    <Card className="mb-3">
      <HolderIconProvider iconChar="" size={32}>
        <CardImg top />
      </HolderIconProvider>
      <CardBody>
        <Media className="mb-3">
          <Media left>
            <CustomInput
              type="checkbox"
              id={`galleryCard-${props.id}`}
              label=""
              className="pr-2"
            />
          </Media>
          <Media body>
            <span>
              <a className="h6 text-decoration-none" href="#">
                {faker.commerce.productName()}
              </a>
              <br />
              <a href="#">{faker.system.fileName()}</a>
            </span>
          </Media>
          <Media right>
            <a
              href="#"
              className="ml-auto"
              id={`galleryCardTooltip-${props.id}`}
            >
              <i className="fa fa-download"></i>
            </a>
            <UncontrolledTooltip
              placement="top"
              target={`galleryCardTooltip-${props.id}`}
            >
              Download
            </UncontrolledTooltip>
          </Media>
        </Media>
        <Media className="mb-3">
          <Media left className="align-self-center mr-3">
            <AvatarImage
              size="md"
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
            <a className="mt-0 d-flex text-decoration-none" href="#">
              {faker.name.firstName()} {faker.name.lastName()}
            </a>
            <span>
              {faker.address.state()}, {faker.address.stateAbbr()}
            </span>
          </Media>
        </Media>
        <div>
          <Badge pill color={randomArray(badges)} className="mr-1">
            {faker.commerce.department()}
          </Badge>
          <Badge pill color={randomArray(badges)} className="mr-1">
            {faker.commerce.department()}
          </Badge>
          <Badge pill color={randomArray(badges)} className="mr-1">
            {faker.commerce.department()}
          </Badge>
        </div>
      </CardBody>
    </Card>
    {/* END Card */}
  </React.Fragment>
);

GalleryCard.defaultProps = {
  id: "1",
};

export { GalleryCard };
