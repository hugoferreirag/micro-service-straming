const routerMethods = require("express").Router();
const SessionsService = require("../services/sessions");

routerMethods.post("/create", (request, response) => {
  const sessionsService = new SessionsService(request.body, response);
  sessionsService.createSession();
});

module.exports = routerMethods;
