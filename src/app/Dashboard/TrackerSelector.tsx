/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { observer } from "mobx-react";
import {
  Typeahead,
  Menu,
  MenuItem,
  Highlighter,
} from "react-bootstrap-typeahead";
import { groupBy } from "underscore";
import { FavouriteService, trackerMap } from "./FavouriteService";

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
        <Menu.Header>{trackerMap[region]}</Menu.Header>
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

export const TrackersSelector = observer(() => {
  const favouriteService = React.useContext(FavouriteService);
  const ref = React.createRef<Typeahead<any>>();
  return (
    <Typeahead
      id="trackers-input"
      ref={ref}
      placeholder="Add favourites..."
      renderMenu={TypeaheadMenu as any}
      selected={[]}
      labelKey="name"
      onChange={([selected]) => {
        favouriteService.addTracker(selected);
        (ref.current as any).clear();
      }}
      options={favouriteService.allTrackers}
    />
  );
});
