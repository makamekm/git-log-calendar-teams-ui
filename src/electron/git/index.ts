import GitRepository from "./git-tools";
import { app } from "electron";
import YAML from "yaml";
import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";
import { pick } from "underscore";
import { waitForDrive, isExist, readFile, writeFile, readDir } from "../drive";
import { Config } from "~/shared/Config";
import { DEV_CONFIG } from "@env/config";

// Collect Stats
const STATS_FILE_POSTFIX = ".stats.json";

// Normalize Data
const UNREGISTERED_SYMBOL = "*";
const OTHERS_LABEL = "*";

const CONFIG_PATH = "/git-log-config.yml";

const DEFAULT_EVALUATE = (item) => item.linesChanged;

// Read data & config
export async function readData(config) {
  config = config || (await getConfig());

  const fileMap = await readStatsFolder();
  await readStats(fileMap, config);

  return { fileMap, config };
}

const getDefaultConfig = (): Config => {
  const homeConfigPath = DEV_CONFIG
    ? path.resolve(DEV_CONFIG)
    : path.resolve(app.getPath("home"), "git-log-config.yml");
  if (fs.existsSync(homeConfigPath)) {
    return YAML.parse(fs.readFileSync(homeConfigPath, "utf-8"));
  }
  return {
    branch: "master",
    onlyRegistered: false,
    collectMessages: false,
    evaluateStr: "item => item.linesChanged",
    collectInterval: 15,
    repositories: [],
    teams: [],
    users: [],
  };
};

// Load Config from YAML
export async function getConfig() {
  await waitForDrive();
  let config: Config;

  if (await isExist(CONFIG_PATH)) {
    const file = await readFile(CONFIG_PATH);
    config = YAML.parse(file);
  } else {
    config = getDefaultConfig();
  }

  config.tmpDir = path.resolve(app.getPath("temp"), "repositories");

  if (config.evaluateStr) {
    // eslint-disable-next-line no-new-func
    config.evaluate = Function(
      '"use strict";return (' + config.evaluateStr + ")"
    )();
  } else {
    config.evaluate = DEFAULT_EVALUATE;
  }

  collectUnusedUsers(config);

  return config;
}

// Save Config from YAML
export async function saveConfig(newConfig: Config) {
  await waitForDrive();
  const oldConfig = await getConfig();

  newConfig = pick(
    {
      ...oldConfig,
      ...newConfig,
    },
    [
      "branch",
      "onlyRegistered",
      "collectInterval",
      "collectMessages",
      "repositories",
      "users",
      "teams",
      "evaluateStr",
    ]
  );

  await writeFile(CONFIG_PATH, YAML.stringify(newConfig));
}

// Format repository name to a file name
function getRepositoryName(repository) {
  return repository.name.replace(/\W+/g, "-").toLowerCase();
}

// Collect users into invert groups (others)
function collectUnusedUsers(config) {
  let usedUsers = [];
  for (let team of config.teams) {
    team.users = team.users || [];
    if (team.invert) {
      team.users = usedUsers;
    } else {
      usedUsers = [...usedUsers, ...team.users];
    }
  }
  return usedUsers;
}

// Get default clone branch name
function getBranchName(repository, config) {
  return repository.branch || config.branch || "master";
}

// Get all stats from a folder and return them with obsolete stats files
async function readStatsFolder() {
  const fileMap = {};
  for (let file of await readDir("/")) {
    if (file.includes(STATS_FILE_POSTFIX)) {
      const repositoryName = file.split(".")[0];
      fileMap[repositoryName] = {
        repositoryName,
        file,
        path: "/" + file,
      };
    }
  }
  return fileMap;
}

// Clone or update git repository
async function loadRepository(repository, config) {
  const repositoryName = getRepositoryName(repository);
  const repositoryPath = path.resolve(config.tmpDir, repositoryName);
  let pathExist = fs.existsSync(repositoryPath);
  let gitRepository = new GitRepository(repositoryPath);

  if (
    config.cleanTmp ||
    repository.cleanTmp ||
    (pathExist && !(await gitRepository.isGitRepository()))
  ) {
    fsExtra.removeSync(repositoryPath);
    pathExist = false;
  }

  if (!pathExist) {
    fsExtra.ensureDirSync(repositoryPath);
    gitRepository = await GitRepository.clone({
      repo: repository.url,
      dir: repositoryPath,
      branch: getBranchName(repository, config),
    });
  } else {
    await gitRepository.checkout(getBranchName(repository, config));
  }

  return gitRepository;
}

// Collect  stats from repositories and save them into a stats folder
export async function collect(config) {
  config = config || (await getConfig());
  fsExtra.ensureDirSync(config.tmpDir);

  for (let repository of config.repositories) {
    try {
      const repositoryName = getRepositoryName(repository);
      const gitRepository = await loadRepository(repository, config);
      const authors = await gitRepository.authors(config.collectMessages);
      if (authors.length > 0) {
        const repositoryAuthorsFileName = `/${repositoryName}${STATS_FILE_POSTFIX}`;
        await writeFile(
          repositoryAuthorsFileName,
          JSON.stringify(authors, null, 4)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// Check if the pair of email & name belongs to a reposoroty & team, but excluding the specifyed occurrences
function isAuthorBelongToRepositoryAndTeam(
  repository,
  team,
  users,
  email,
  name,
  onlyRegistered
) {
  const user = getAuthor(users, email, name);
  if (onlyRegistered && !user) {
    return false;
  }
  name = name.toLowerCase();
  email = email.toLowerCase();
  const excludeTeam =
    team.exclude &&
    (team.exclude.includes(name) || team.exclude.includes(email));
  const excludeRepository =
    repository.exclude &&
    (repository.exclude.includes(name) || repository.exclude.includes(email));
  if (user) {
    const includesTeam = team.users.includes(user.name);
    return (
      (team.invert ? !includesTeam : includesTeam) &&
      (!team.exclude || !excludeTeam) &&
      (!repository.exclude || !excludeRepository)
    );
  } else {
    const includesTeam =
      team.users.includes(name) || team.users.includes(email);
    return (
      (team.invert ? !includesTeam : includesTeam) &&
      (!team.exclude || !excludeTeam) &&
      (!repository.exclude || !excludeRepository)
    );
  }
}

async function readStats(fileMap, config) {
  for (let repository of config.repositories) {
    const repositoryName = getRepositoryName(repository);
    if (fileMap[repositoryName]) {
      const authors = JSON.parse(await readFile(fileMap[repositoryName].path));
      fileMap[repositoryName].data = authors;
    }
  }
  return fileMap;
}

// Check if the pair of email & name belongs to a reposoroty, but excluding the specifyed occurrences
function isAuthorBelongToRepository(
  repository,
  users,
  email,
  name,
  onlyRegistered
) {
  const user = getAuthor(users, email, name);
  if (onlyRegistered && !user) {
    return false;
  }
  name = name.toLowerCase();
  email = email.toLowerCase();
  const excludeRepository =
    repository.exclude &&
    (repository.exclude.includes(name) || repository.exclude.includes(email));
  return !repository.exclude || !excludeRepository;
}

// Check if the pair of email & name belongs to a reposoroty & team, but excluding the specifyed occurrences
function getAuthor(users, email, name) {
  name = name.toLowerCase();
  email = email.toLowerCase();
  return users.find(
    (u) => u.associations.includes(email) || u.associations.includes(name)
  );
}

function isAuthorBelong(teams, repository, author, config) {
  const isAllTeams = !teams;
  if (isAllTeams) {
    return isAuthorBelongToRepository(
      repository,
      config.users,
      author.email,
      author.name,
      config.onlyRegistered
    );
  }
  for (let team of config.teams) {
    const isBelong =
      teams.includes(team.name) &&
      isAuthorBelongToRepositoryAndTeam(
        repository,
        team,
        config.users,
        author.email,
        author.name,
        config.onlyRegistered
      );
    if (isBelong) {
      return true;
    }
  }
  return false;
}

function sortMapDataTop(data, top) {
  const newData = {};
  Object.keys(data)
    .sort((a, b) => data[b] - data[a])
    .splice(0, top)
    .forEach((key) => {
      newData[key] = data[key];
    });
  return newData;
}

export function normalizeCommitsAndLineChanges(report, fileMap, config): any {
  return normalizeDataReduce(report, fileMap, config, ({ data, author }) => {
    if (!data.commits) {
      data.commits = 0;
    }
    if (!data.linesChanged) {
      data.linesChanged = 0;
    }
    data.commits += author.commits;
    data.linesChanged += author.linesChanged;
  });
}

function normalizeDataReduce(report, fileMap, config, callback) {
  const isAllUsers = !report.users;
  const isAllRepositories = !report.repositories;
  const isOthers = report.others;
  let data = {};

  const now = new Date();
  const nowTimestamp = +now;

  for (let repository of config.repositories) {
    const repositoryName = getRepositoryName(repository);
    if (
      fileMap[repositoryName] &&
      (isAllRepositories || report.repositories.includes(repository.name))
    ) {
      for (let author of fileMap[repositoryName].data) {
        if (isAuthorBelong(report.teams, repository, author, config)) {
          const user = getAuthor(config.users, author.email, author.name);
          const email = author.email.toLowerCase();
          const name = author.name.toLowerCase();
          let userKey =
            (user && user.name) || `${email} ${name} ${UNREGISTERED_SYMBOL}`;
          let shouldLogUser =
            isAllUsers ||
            (user
              ? report.users.includes(user.name)
              : report.users.includes(email) || report.users.includes(name));
          if (!shouldLogUser && isOthers) {
            userKey = report.othersLabel || OTHERS_LABEL;
            shouldLogUser = true;
          }
          if (shouldLogUser) {
            if (!report.limit) {
              // Compare by total contributed lines (added + removed)
              callback({
                data,
                value: config.evaluate(author),
                author,
                repository,
                userKey,
                repositoryName,
              });
            } else {
              const limit = new Date();
              limit.setDate(limit.getDate() - report.limit);
              const limitTimestamp = +limit;
              const map = report.timestamp ? author.timestampMap : author.map;
              if (map) {
                for (let dateString in map) {
                  const date = report.timestamp
                    ? +dateString
                    : new Date(dateString);
                  const timestamp = +date;
                  if (
                    timestamp <= nowTimestamp &&
                    timestamp >= limitTimestamp
                  ) {
                    // Compare by total contributed lines (added + removed)
                    callback({
                      data,
                      value: config.evaluate(map[dateString]),
                      author,
                      repository,
                      userKey,
                      dateString,
                      repositoryName,
                      message: map[dateString].message,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  if (report.top) {
    data = sortMapDataTop(data, report.top);
  }

  return data;
}

export function getAllRepositoryUsers(repositories, fileMap, config): any {
  const result = {};
  for (let repository of config.repositories) {
    const repositoryName = getRepositoryName(repository);
    if (
      fileMap[repositoryName] &&
      (!repositories || repositories.includes(repository.name))
    ) {
      for (let author of fileMap[repositoryName].data) {
        const user = getAuthor(config.users, author.email, author.name);
        const email = author.email.toLowerCase();
        const name = author.name.toLowerCase();
        let userKey =
          (user && user.name) || `${email} ${name} ${UNREGISTERED_SYMBOL}`;
        if (!result[userKey]) {
          result[userKey] = {
            userKey,
            user,
            email,
            name,
            value: config.evaluate(author),
          };
        } else {
          result[userKey].value += config.evaluate(author);
        }
      }
    }
  }
  return Object.values(result);
}

export function searchCommitMessages(report, fileMap, config) {
  let result = [];
  normalizeDataReduce(
    { ...report, timestamp: true },
    fileMap,
    config,
    ({ repository, value, dateString, userKey, message }) => {
      if (message && message.includes(report.query)) {
        result.push({
          message,
          userKey,
          timestamp: dateString,
          value,
          repository: repository.name,
        });
      }
    }
  );
  result = result.sort((a, b) => +b.timestamp - +a.timestamp);
  result = result.splice(0, report.maxMessages || 10);
  return result;
}

export function normalizeUserData(report, fileMap, config) {
  return normalizeDataReduce(
    report,
    fileMap,
    config,
    ({ data, value, userKey }) => {
      if (!data[userKey]) {
        data[userKey] = 0;
      }
      data[userKey] += value;
    }
  );
}

export function normalizeRepositoryData(report, fileMap, config) {
  return normalizeDataReduce(
    report,
    fileMap,
    config,
    ({ data, value, repository }) => {
      if (!data[repository.name]) {
        data[repository.name] = 0;
      }
      data[repository.name] += value;
    }
  );
}

// Check if the pair of email & name belongs to a team, but excluding the specifyed occurrences
function isAuthorBelongToTeam(team, users, email, name) {
  name = name.toLowerCase();
  email = email.toLowerCase();
  const user = users.find(
    (u) => u.associations.includes(email) || u.associations.includes(name)
  );
  const excludeTeam =
    team.exclude &&
    (team.exclude.includes(name) || team.exclude.includes(email));
  if (user) {
    const includesTeam = team.users.includes(user.name);
    return (
      (team.invert ? !includesTeam : includesTeam) &&
      (!team.exclude || !excludeTeam)
    );
  } else {
    const includesTeam =
      team.users.includes(name) || team.users.includes(email);
    return (
      (team.invert ? !includesTeam : includesTeam) &&
      (!team.exclude || !excludeTeam)
    );
  }
}

function findUserTeams(teams, author, config) {
  const result = [];
  const isAllTeams = !teams;
  for (let team of config.teams) {
    const isBelong =
      (isAllTeams || teams.includes(team.name)) &&
      isAuthorBelongToTeam(team, config.users, author.email, author.name);
    if (isBelong) {
      result.push(team.name);
    }
  }
  return result;
}

export function normalizeTeamData(report, fileMap, config) {
  return normalizeDataReduce(
    report,
    fileMap,
    config,
    ({ data, value, author }) => {
      const teams = findUserTeams(report.teams, author, config);
      for (const teamName of teams) {
        if (!data[teamName]) {
          data[teamName] = 0;
        }
        data[teamName] += value;
      }
    }
  );
}

function collectTeamDates(report, fileMap, config) {
  const teamDates = {};

  for (let team of config.teams) {
    teamDates[team.name] = {};
  }

  normalizeDataReduce(
    report,
    fileMap,
    config,
    ({ value, author, dateString }) => {
      const teams = findUserTeams(report.teams, author, config);
      for (const teamName of teams) {
        teamDates[teamName][dateString] =
          (teamDates[teamName][dateString] || 0) + value;
      }
    }
  );

  return teamDates;
}

function collectUserDates(report, fileMap, config) {
  const userDates = {};

  for (let user of config.users) {
    userDates[user.name] = {};
  }

  normalizeDataReduce(
    report,
    fileMap,
    config,
    ({ value, userKey, dateString }) => {
      if (!userDates[userKey]) {
        userDates[userKey] = {};
      }
      userDates[userKey][dateString] =
        (userDates[userKey][dateString] || 0) + value;
    }
  );

  return userDates;
}

function collectRepositoriesDates(report, fileMap, config) {
  const repositoryDates = {};

  for (let repository of config.repositories) {
    repositoryDates[repository.name] = {};
  }

  normalizeDataReduce(
    report,
    fileMap,
    config,
    ({ value, dateString, repository }) => {
      repositoryDates[repository.name][dateString] =
        (repositoryDates[repository.name][dateString] || 0) + value;
    }
  );

  return repositoryDates;
}

export function normalizeCalendarData(report, fileMap, config) {
  const teamDates = collectTeamDates(report, fileMap, config);
  const userDates = collectUserDates(report, fileMap, config);
  const repositoriesDates = collectRepositoriesDates(report, fileMap, config);
  return {
    teamDates,
    userDates,
    repositoriesDates,
  };
}