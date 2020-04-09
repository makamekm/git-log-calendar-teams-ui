/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import faker from "faker/locale/en_US";
import {
  Badge,
  CustomInput,
  UncontrolledTooltip,
  Media,
  AvatarAddonIcon,
  AvatarImage,
} from "~/components";
import { randomArray } from "~/utilities";

const status = ["secondary", "success", "warning", "danger"];

const tag = ["secondary", "primary", "info"];

const TrTableClients = (props: { id?: string }) => (
  <React.Fragment>
    <tr>
      <td className="align-middle">
        <CustomInput
          type="checkbox"
          id={`trTableClients-${props.id}`}
          label=""
          inline
        />
      </td>
      <td className="align-middle">
        <a href="#" id={`trTableClientsTooltip-${props.id}`}>
          <i className="fa fa-fw fa-star-o"></i>
        </a>
        <UncontrolledTooltip
          placement="top"
          target={`trTableClientsTooltip-${props.id}`}
        >
          Add To Favorites
        </UncontrolledTooltip>
      </td>
      <td className="align-middle">
        <Media>
          <Media left className="align-self-center mr-3">
            <AvatarImage
              size="md"
              src="http://bs4.webkom.co/img/avatars/2.jpg"
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
            <span>{faker.name.jobTitle()}</span>
          </Media>
        </Media>
      </td>
      <td className="align-middle">{faker.internet.email()}</td>
      <td className="align-middle">{faker.phone.phoneNumberFormat()}</td>
      <td className="align-middle text-right">
        <Badge pill color={randomArray(tag)}>
          {faker.commerce.department()}
        </Badge>
      </td>
    </tr>
  </React.Fragment>
);

TrTableClients.defaultProps = {
  id: "1",
};

export { TrTableClients };
