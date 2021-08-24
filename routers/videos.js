const routerMethods = require("express").Router();
const path = require("path");

const VideoServices = require("../services/videos");

routerMethods.post("/create", (request, response) => {
  const { body } = request;

  const videoServices = new VideoServices(body, response);
  videoServices.uploadNewVideo();
});
routerMethods.get("/list/all", (request, response) => {
  const videoServices = new VideoServices({}, response);
  videoServices.getAllVideoPerSessions();
});

module.exports = routerMethods;
