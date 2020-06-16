import React from "react";
import { observer } from "mobx-react";

import { HeaderMain } from "~/components/Blocks/HeaderMain";
import { DashboardToolbar } from "./Components/DashboardToolbar";
import { DashboardService } from "./DashboardService";
import { TrackersSelector } from "./Components/TrackerSelector";
import { useOnLoad } from "~/hooks";
import { useLayoutConfig } from "~/components/Layout/LayoutService";
import { TrackerCompares } from "./Components/TrackerCompares";

export const DashboardCompare = observer(() => {
  const state = React.useContext(DashboardService);
  const onLoad = React.useCallback(() => {
    state.mode = null;
    state.name = null;
    state.load();
  }, [state]);
  useOnLoad(onLoad);
  useLayoutConfig({
    pageTitle: "Favourites",
    breadcrumbs: [
      {
        name: "Favourites",
      },
    ],
  });

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-wrap mb-3">
          <HeaderMain title="Favourites" className="mb-3" />
          <DashboardToolbar state={state} />
        </div>
      </div>

      <div className="mb-3 no-print">
        <TrackersSelector />
      </div>

      <TrackerCompares />
    </>
  );
});
