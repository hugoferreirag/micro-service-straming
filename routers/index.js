const routersModel = require("express").Router();
const sessionRouters = require("./sessions");
const videoRouters = require("./videos");

routersModel.use("/sessions", sessionRouters);
routersModel.use("/videos", videoRouters);

module.exports = routersModel;
