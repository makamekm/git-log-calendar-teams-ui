import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import {
  Typeahead,
  Menu,
  MenuItem,
  Highlighter,
} from "react-bootstrap-typeahead";
import { groupBy } from "lodash";
import { searchMap, SearchService } from "../SearchService";
import { useHistory } from "react-router";

import "./SearchBar.scss";

const TypeaheadMenu = (
  results: {
    name: string;
    type: string;
  }[],
  menuProps,
  state
) => {
  let index = 0;
  const types = groupBy(results, "type");
  const items = Object.keys(types)
    .sort()
    .map((region) => (
      <React.Fragment key={region}>
        {index !== 0 && <Menu.Divider />}
        <Menu.Header>{searchMap[region]}</Menu.Header>
        {types[region].map((i) => {
          const item = (
            <MenuItem key={index} option={i} position={index}>
              <Highlighter search={state.text}>{i.name}</Highlighter>
            </MenuItem>
          );

          index += 1;
          return item;
        })}
      </React.Fragment>
    ));

  return <Menu {...menuProps}>{items}</Menu>;
};

export const SearchBar = observer(() => {
  const service = React.useContext(SearchService);
  const history = useHistory();
  const ref = React.createRef<Typeahead<any>>();
  return (
    <div
      className={classNames("mr-2 ml-3", {
        "flex-1": service.isFocus,
      })}
      style={{ width: service.isFocus ? "100%" : undefined }}
    >
      <div className="search-bar flex justify-start items-center">
        <div>
          <i className="fa fa-search mr-2"></i>
        </div>
        <Typeahead
          id="search-input"
          ref={ref}
          placeholder="Search..."
          renderMenu={TypeaheadMenu as any}
          selected={[]}
          open={service.isFocus}
          labelKey="name"
          onKeyDown={service.reload}
          onBlur={() => {
            service.isFocus = false;
          }}
          onFocus={() => {
            service.reload();
            service.isFocus = true;
          }}
          onChange={([selected]) => {
            (ref.current as any).clear();
            (ref.current as any).blur();
            history.push(`/${selected.type}/${selected.name}`);
          }}
          options={service.items}
        />
      </div>
    </div>
  );
});
