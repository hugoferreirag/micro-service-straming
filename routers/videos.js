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
routerMethods.get(
  "/list/pagination/sessionId/:sessionId/page/:page",
  (request, response) => {
    const videoServices = new VideoServices({}, response);
    const sessionId = request.params.sessionId;
    const page = request.params.page;

    videoServices.paginationVideos(sessionId, page);
  }
);
routerMethods.get("/list/pagination/page/:page", (request, response) => {
  const videoServices = new VideoServices({}, response);

  const page = request.params.page;

  videoServices.paginationSessions(page);
});
module.exports = routerMethods;
