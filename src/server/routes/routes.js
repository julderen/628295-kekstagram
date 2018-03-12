const express = require(`express`);
const bodyParser = require(`body-parser`);
const apiPosts = require(`./api/posts`);

module.exports = {
  init(server) {
    server.use(`/api`, bodyParser.json());
    server.use(`/api`, apiPosts);
    server.use(express.static(`static`));
  }
};
