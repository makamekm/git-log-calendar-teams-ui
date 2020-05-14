import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { groupBy } from "lodash";
import { searchMap, SearchService } from "../SearchService";
import { useHistory } from "react-router";
import { Typeahead } from "~/components/Typeahead/Typeahead";

export const SearchBar = observer(() => {
  const [storage] = React.useState({ timeout: null as number });
  const service = React.useContext(SearchService);
  const history = useHistory();
  const types = groupBy(service.items, "type");
  const items = Object.keys(types)
    .sort()
    .map((region) => {
      return {
        label: searchMap[region],
        id: region,
        values: types[region].map((s) => s.name),
      };
    });
  return (
    <div
      className={classNames("mr-2 ml-3", {
        "flex-1": service.isFocus,
      })}
      style={{
        transition: "flex 0.1s",
      }}
    >
      <div className="search-bar flex justify-start items-center">
        <div>
          <i className="fa fa-search mr-2"></i>
        </div>
        <Typeahead
          placeholder="Search..."
          selected={[]}
          hideCaret
          hideClear
          onClose={() => {
            storage.timeout = window.setTimeout(() => {
              service.isFocus = false;
            }, 200);
          }}
          onOpen={() => {
            window.clearTimeout(storage.timeout);
            service.reload();
            service.isFocus = true;
          }}
          onChange={([selected], group) => {
            if (selected) {
              history.push(`/${group.id}/${selected}`);
            }
          }}
          options={items}
        />
      </div>
    </div>
  );
});
