const express = require(`express`);
const apiPosts = require(`./api/posts`);

module.exports = {
  init(server) {
    server.use(`/api`, apiPosts);
    server.use(express.static(`static`));
  }
};
