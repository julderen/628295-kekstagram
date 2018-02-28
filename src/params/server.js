const http = require(`http`);
const url = require(`url`);
const pathLib = require(`path`);

const paramsUtils = require(`../utils/paramsUtils`);
const fileUtils = require(`../utils/fileUtils`);

const PORT = 3000;
const HOSTNAME = `127.0.0.1`;
const EMPTY_PATH = `/`;
const DEFAULT_FILE = `/index.html`;
const CONTENT_TYPES = {
  '.css': `text/css`,
  '.html': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.png': `image/jpeg`,
  '.ico': `image/x-icon`
};
const PATH_TO_STATIC = __dirname.split(`/`).slice(0, -2).join(`/`) + `/static`;

const readFile = async (path, res) => {
  const data = await fileUtils.readFile(path);

  res.writeHead(200, {
    'content-type': CONTENT_TYPES[pathLib.extname(path)],
    'content-length': Buffer.byteLength(data)
  });

  res.end(data);
};

const errorNotFound = (res) => {
  res.statusCode = 404;
  res.end();
};

const errorInternalServer = (res) => (e) => {
  res.writeHead(500, e.message, {'content-type': `text/plain`});
};

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  const absolutePath = PATH_TO_STATIC + (path === EMPTY_PATH ? DEFAULT_FILE : path);

  (async () => {
    try {
      const pathStat = await fileUtils.stat(absolutePath);

      if (!(pathStat.isDirectory())) {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      errorNotFound(res);
    }
  })().catch(errorInternalServer(res));
});

module.exports = {
  name: `--server`,
  description: `Start server`,
  condition(param) {
    return paramsUtils.defaultCondition(this.name, param);
  },
  execute([port = PORT]) {
    server.listen(port, HOSTNAME, () => {
      console.log(`Server running att http://${HOSTNAME}:${port}`);
    });
  }
};
