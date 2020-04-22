import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import {
  Typeahead,
  Menu,
  MenuItem,
  Highlighter,
} from "react-bootstrap-typeahead";
import { groupBy } from "underscore";
import { searchMap, SearchService } from "../SearchService";
import { useHistory } from "react-router";
import { Nav, NavItem } from "~/components";

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
  const [isFocus, setIsFocus] = React.useState(false);
  const service = React.useContext(SearchService);
  const history = useHistory();
  const ref = React.createRef<Typeahead<any>>();
  return (
    <Nav
      navbar
      className={classNames("mr-4", {
        "ml-4": isFocus,
        "ml-auto": !isFocus,
      })}
      style={{ width: isFocus ? "100%" : undefined }}
    >
      <NavItem className="search-bar d-flex justify-content-start align-items-center no-print">
        <i className="fa fa-search mr-2"></i>
        <Typeahead
          id="search-input"
          ref={ref}
          placeholder="Search..."
          renderMenu={TypeaheadMenu as any}
          selected={[]}
          labelKey="name"
          onKeyDown={service.reload}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => {
            service.reload();
            setIsFocus(true);
          }}
          onChange={([selected]) => {
            (ref.current as any).clear();
            (ref.current as any).blur();
            history.push(`/${selected.type}/${selected.name}`);
          }}
          options={service.items}
        />
      </NavItem>
    </Nav>
  );
});
