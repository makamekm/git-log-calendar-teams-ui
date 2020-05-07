const spawn = require('spawnback');

const BREAK_LINE = '__brln__ ';
const COMMIT_START = '__cmstart__';
const COMMIT_END = '__cmend__';

function GitRepository(path) {
  this.path = path;
}

GitRepository.clone = async function(options) {
  const repo = new GitRepository(options.dir);

  const args = ['clone', options.repo];
  options = { ...options };
  delete options.repo;
  delete options.dir;

  Object.keys(options).forEach(option => {
    args.push('--' + option);
    const value = options[option];
    if (value !== true) {
      args.push(value);
    }
  });

  args.push('.');

  await repo.exec(...args);
  return repo;
};

GitRepository.prototype.exec = async function(...args) {
  return new Promise((r, e) =>
    spawn('git', args, { cwd: this.path }, (error, stdout) => {
      if (error) {
        return e(error);
      }
      r(stdout.replace(/\n$/, ''));
    })
  );
};

function getStats(lines, collectMessages) {
  let message = '';
  if (collectMessages && lines) {
    message = new RegExp(`${COMMIT_START}(.*)${COMMIT_END}`, 'm').exec(lines)[1];
    lines = lines.replace(new RegExp(`${COMMIT_START}.*${COMMIT_END}`, 'm'), '');
  }
  lines = lines.split('\n');
  let [line, _, ...lns] = lines;
  let filesChanged = 0;
  let linesAdded = 0;
  let linesDeleted = 0;
  let linesChanged = 0;
  lns.forEach(ln => {
    ln = ln.split('\t');
    if (ln[0]) {
      filesChanged++;
      let added = Number(ln[0]);
      added = Number.isNaN(added) ? 0 : added;
      let deleted = Number(ln[1]);
      deleted = Number.isNaN(deleted) ? 0 : deleted;
      linesAdded += added;
      linesDeleted += deleted;
      linesChanged += added + deleted;
    }
  });
  return {
    line,
    filesChanged,
    linesAdded,
    linesDeleted,
    linesChanged,
    message
  };
}

function getDate(timestamp) {
  let date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  date = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  return date;
}

GitRepository.prototype.age = async function() {
  const data = await this.exec('log', '--reverse', '--format=%cr');
  return data.split('\n')[0].replace(/\sago/, '');
};

GitRepository.prototype.remote = async function() {
  await this.exec('remote');
  await this.fetch();
};

GitRepository.prototype.checkout = async function(branch) {
  await this.remote();
  await this.reset();
  const branches = await this.localBranches();
  if (branches.includes(branch)) {
    await this.exec('checkout', `${branch}`);
  } else {
    await this.exec('checkout', '-b', `${branch}`, `origin/${branch}`);
  }
  await this.pull();
};

GitRepository.prototype.localBranches = async function() {
  const data = await this.exec('branch', '--list');
  return data.split('\n').map(s => s.replace(/\*/gi, '').trim());
};

GitRepository.prototype.fetch = async function() {
  await this.exec('fetch', 'origin');
};

GitRepository.prototype.pull = async function() {
  await this.exec('pull', '--force');
};

GitRepository.prototype.reset = async function() {
  await this.exec('reset', '--hard', 'HEAD');
};

GitRepository.prototype.authors = async function(collectMessages, ...args) {
  const data = await this.exec(
    'log',
    `--format=${BREAK_LINE}%at %aE %aN${collectMessages ? COMMIT_START + '%s' + COMMIT_END : ''}`,
    '--find-renames',
    '--no-renames',
    '--numstat',
    '--all',
    '--no-merges',
    ...args
  );

  let authors = data.length ? data.split(BREAK_LINE) : [];
  const authorMap = {};
  let totalCommits = 0;
  let totalFilesChanged = 0;
  let totalLinesAdded = 0;
  let totalLinesDeleted = 0;
  let totalLinesChanged = 0;

  authors.forEach(lines => {
    const { line, filesChanged, linesAdded, linesDeleted, linesChanged, message } = getStats(lines, collectMessages);
    let [timestamp, ...author] = line.split(' ');
    author = author.join(' ').trim();
    timestamp = timestamp * 1000;
    const date = getDate(timestamp);

    if (!author) {
      return;
    }

    if (!authorMap[author]) {
      authorMap[author] = {
        commits: 0,
        filesChanged: 0,
        linesAdded: 0,
        linesDeleted: 0,
        linesChanged: 0,
        map: {},
        timestampMap: {}
      };
    }

    if (!authorMap[author].map[date]) {
      authorMap[author].map[date] = {
        commits: 0,
        filesChanged: 0,
        linesAdded: 0,
        linesDeleted: 0,
        linesChanged: 0
      };
    }

    authorMap[author].map[date].commits++;
    authorMap[author].map[date].filesChanged += filesChanged;
    authorMap[author].map[date].linesAdded += linesAdded;
    authorMap[author].map[date].linesDeleted += linesDeleted;
    authorMap[author].map[date].linesChanged += linesChanged;

    if (collectMessages) {
      if (!authorMap[author].timestampMap[timestamp]) {
        authorMap[author].timestampMap[timestamp] = {
          commits: 0,
          filesChanged: 0,
          linesAdded: 0,
          linesDeleted: 0,
          linesChanged: 0,
          message: ''
        };
      }

      authorMap[author].timestampMap[timestamp].commits++;
      authorMap[author].timestampMap[timestamp].filesChanged += filesChanged;
      authorMap[author].timestampMap[timestamp].linesAdded += linesAdded;
      authorMap[author].timestampMap[timestamp].linesDeleted += linesDeleted;
      authorMap[author].timestampMap[timestamp].linesChanged += linesChanged;
      authorMap[author].timestampMap[timestamp].message = message;
    }

    authorMap[author].commits++;
    authorMap[author].filesChanged += filesChanged;
    authorMap[author].linesAdded += linesAdded;
    authorMap[author].linesDeleted += linesDeleted;
    authorMap[author].linesChanged += linesChanged;

    totalCommits++;
    totalFilesChanged += filesChanged;
    totalLinesAdded += linesAdded;
    totalLinesDeleted += linesDeleted;
    totalLinesChanged += linesChanged;
  });

  authors = Object.keys(authorMap)
    .map(author => {
      let [email, ...name] = author.split(' ');
      name = name.join(' ').trim();
      return {
        email,
        name,
        commitsPercent: Number(((authorMap[author].commits * 100) / totalCommits).toFixed(1)),
        filesChangedPercent: Number(((authorMap[author].filesChanged * 100) / totalFilesChanged).toFixed(1)),
        linesAddedPercent: Number(((authorMap[author].linesAdded * 100) / totalLinesAdded).toFixed(1)),
        linesDeletedPercent: Number(((authorMap[author].linesDeleted * 100) / totalLinesDeleted).toFixed(1)),
        linesChangedPercent: Number(((authorMap[author].linesChanged * 100) / totalLinesChanged).toFixed(1)),
        ...authorMap[author]
      };
    })
    .sort((a, b) => {
      return b.commits - a.commits;
    });

  return authors;
};

GitRepository.prototype.isGitRepository = async function() {
  try {
    await this.exec('rev-parse', '--git-dir');
    return true;
  } catch (error) {
    if (error.message.indexOf('Not a git repository')) {
      return false;
    }

    // If the path doesn't exist, don't return an error
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
};

module.exports = GitRepository;
