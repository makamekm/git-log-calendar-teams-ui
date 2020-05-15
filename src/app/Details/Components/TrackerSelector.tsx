import React from "react";
import { observer } from "mobx-react";
import { groupBy } from "lodash";
import { FavouriteService, trackerMap } from "../../FavouriteService";
import { Typeahead } from "~/components/Typeahead/Typeahead";

export const TrackersSelector = observer(() => {
  const favouriteService = React.useContext(FavouriteService);
  const types = groupBy(favouriteService.allTrackers, "type");
  const items = Object.keys(types)
    .sort()
    .map((region) => {
      return {
        label: trackerMap[region],
        id: region,
        values: types[region].map((s) => s.name),
      };
    });
  return (
    <Typeahead
      icon={<i className="fa fa-plus"></i>}
      placeholder="Add favourites..."
      selected={[]}
      hideCaret
      hideClear
      onChange={([selected], group) => {
        favouriteService.addTracker(selected, group.id);
      }}
      options={items}
    />
  );
});
