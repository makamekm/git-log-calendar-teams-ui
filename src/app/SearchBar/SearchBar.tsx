import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { SearchService } from "../Layout/SearchService";
import { useHistory } from "react-router";
import { Typeahead } from "~/components/Typeahead/Typeahead";

export const SearchBar = observer(() => {
  const [storage] = React.useState({ timeout: null as number });
  const service = React.useContext(SearchService);
  const history = useHistory();
  return (
    <div
      className={classNames("hidden sm:block mr-2 ml-3", {
        "flex-1": service.isFocus,
      })}
      style={{
        transition: "flex 0.1s",
      }}
    >
      <div className="search-bar flex justify-start items-center">
        <Typeahead
          icon={<i className="fa fa-search"></i>}
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
          options={service.searchItems}
        />
      </div>
    </div>
  );
});
