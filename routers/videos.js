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
  "/list/pagination/sessionId/:sessionId/currentqtd/:currentqtd",
  (request, response) => {
    const videoServices = new VideoServices({}, response);
    const sessionId = request.params.sessionId;
    const currentQuantity = request.params.currentqtd;

    videoServices.paginationVideos(sessionId, currentQuantity);
  }
);
routerMethods.get(
  "/list/pagination/currentqtd/:currentqtd",
  (request, response) => {
    const videoServices = new VideoServices({}, response);

    const currentQuantity = request.params.currentqtd;

    videoServices.paginationSessions(currentQuantity);
  }
);
module.exports = routerMethods;
