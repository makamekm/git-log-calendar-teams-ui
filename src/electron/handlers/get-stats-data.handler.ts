import { ipcMain, app } from "electron";
import { nameofHandler, Ipc, ipc, nameofSends } from "~/shared/ipc";

import {
  normalizeUserData,
  normalizeRepositoryData,
  normalizeTeamData,
  normalizeCommitsAndLineChanges,
} from "../git";
import { CACHE_LIFETIME } from "@env/config";

type Stats = ReturnType<Ipc["handlers"]["GET_STATS_DATA"]>;

function processData(data) {
  return Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));
}

let cache: {
  [key: string]: {
    time: number;
    value: Stats;
  };
} = {};

app.on("ready", () => {
  ipcMain.on(nameofSends("ON_DRIVE_CONFIG_UPDATE_FINISH"), () => {
    cache = {};
  });
  ipcMain.on(nameofSends("ON_COLLECT_FINISH"), () => {
    cache = {};
  });
});

ipcMain.handle(
  nameofHandler("GET_STATS_DATA"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_STATS_DATA"]>
  ): Promise<Stats> => {
    let [{ limit, mode, name, top }] = args;
    top = top || 5;

    const key = [limit, mode, name, top].join("__");
    const time = +new Date();
    if (cache[key] && cache[key].time + CACHE_LIFETIME > time) {
      return cache[key].value;
    }

    const result: Stats = {
      changes: {
        todayValue: 0,
        value: 0,
      },
      commits: {
        todayValue: 0,
        value: 0,
      },
      stats: {},
    };

    const config = await ipc.handlers.GET_CONFIG();
    const fileMap = await ipc.handlers.GET_DATA();

    const report: any = {
      limit,
      top,
    };

    const reportToday: any = {
      limit: 1,
      top,
    };

    if (mode === "repository") {
      report.repositories = [name];
      reportToday.repositories = [name];
    } else if (mode === "team") {
      report.teams = [name];
      reportToday.teams = [name];
    } else if (mode === "user") {
      report.users = [name];
      reportToday.users = [name];
    }

    const statsToday = normalizeCommitsAndLineChanges(
      {
        ...reportToday,
        top: null,
      },
      fileMap,
      config
    );
    const stats = normalizeCommitsAndLineChanges(
      {
        ...report,
        top: null,
      },
      fileMap,
      config
    );
    result.changes.todayValue = statsToday.linesChanged || 0;
    result.changes.value = stats.linesChanged || 0;
    result.commits.todayValue = statsToday.commits || 0;
    result.commits.value = stats.commits || 0;

    if (mode === "repository") {
      result.topUsers = {
        value: processData(normalizeUserData(report, fileMap, config)),
        todayValue: processData(
          normalizeUserData(reportToday, fileMap, config)
        ),
      };
      result.topTeams = {
        value: processData(normalizeTeamData(report, fileMap, config)),
        todayValue: processData(
          normalizeTeamData(reportToday, fileMap, config)
        ),
      };

      result.stats.activeTeams = {
        todayValue: processData(
          normalizeTeamData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeTeamData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
      result.stats.activeUsers = {
        todayValue: processData(
          normalizeUserData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeUserData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
    } else if (mode === "team") {
      result.topUsers = {
        value: processData(normalizeUserData(report, fileMap, config)),
        todayValue: processData(
          normalizeUserData(reportToday, fileMap, config)
        ),
      };
      result.topRepositories = {
        value: processData(normalizeRepositoryData(report, fileMap, config)),
        todayValue: processData(
          normalizeRepositoryData(reportToday, fileMap, config)
        ),
      };

      result.stats.activeRepositories = {
        todayValue: processData(
          normalizeRepositoryData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeRepositoryData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
      result.stats.activeUsers = {
        todayValue: processData(
          normalizeUserData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeUserData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
    } else if (mode === "user") {
      result.topTeams = {
        value: processData(normalizeTeamData(report, fileMap, config)),
        todayValue: processData(
          normalizeTeamData(reportToday, fileMap, config)
        ),
      };
      result.topRepositories = {
        value: processData(normalizeRepositoryData(report, fileMap, config)),
        todayValue: processData(
          normalizeRepositoryData(reportToday, fileMap, config)
        ),
      };

      result.stats.activeRepositories = {
        todayValue: processData(
          normalizeRepositoryData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeRepositoryData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
      result.stats.activeTeams = {
        todayValue: processData(
          normalizeTeamData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeTeamData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
    } else {
      result.topUsers = {
        value: processData(normalizeUserData(report, fileMap, config)),
        todayValue: processData(
          normalizeUserData(reportToday, fileMap, config)
        ),
      };
      result.topTeams = {
        value: processData(normalizeTeamData(report, fileMap, config)),
        todayValue: processData(
          normalizeTeamData(reportToday, fileMap, config)
        ),
      };
      result.topRepositories = {
        value: processData(normalizeRepositoryData(report, fileMap, config)),
        todayValue: processData(
          normalizeRepositoryData(reportToday, fileMap, config)
        ),
      };

      result.stats.activeRepositories = {
        todayValue: processData(
          normalizeRepositoryData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeRepositoryData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
      result.stats.activeTeams = {
        todayValue: processData(
          normalizeTeamData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeTeamData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
      result.stats.activeUsers = {
        todayValue: processData(
          normalizeUserData(
            {
              ...reportToday,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
        value: processData(
          normalizeUserData(
            {
              ...report,
              top: null,
            },
            fileMap,
            config
          )
        ).length,
      };
    }

    cache[key] = {
      time: time,
      value: result,
    };

    return result;
  }
);
