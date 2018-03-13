const express = require(`express`);
const bodyParser = require(`body-parser`);
const apiPosts = require(`./api/posts`);
const corsMiddleware = require(`../middleware/cors-middleware`);

module.exports = {
  init(server) {
    server.use(`/api`, corsMiddleware, bodyParser.json());
    server.use(`/api`, apiPosts);
    server.use(express.static(`static`));
  }
};
