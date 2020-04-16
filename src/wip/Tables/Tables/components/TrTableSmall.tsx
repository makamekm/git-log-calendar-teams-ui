import React from "react";
import faker from "faker/locale/en_US";
import _ from "lodash";
import { Badge } from "~/components";

const payment = ["success", "danger", "warning", "secondary"];

const TrTableSmall = () => (
  <React.Fragment>
    {_.times(4, (index) => (
      <tr key={index}>
        <td className="align-middle">#{faker.finance.mask()}</td>
        <td className="align-middle">
          {faker.name.firstName()} {faker.name.lastName()}
        </td>
        <td className="align-middle">$ {faker.finance.amount()}</td>
        <td className="align-middle text-right">
          <Badge pill color={payment[index % 4]}>
            {faker.finance.transactionType()}
          </Badge>
        </td>
      </tr>
    ))}
  </React.Fragment>
);

export { TrTableSmall };
