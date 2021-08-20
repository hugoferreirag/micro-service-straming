const routerMethods = require("express").Router();
const path = require("path");

const SubscriberService = require("../services/videos");
const multer = require("multer");

const uploadFolder = path.resolve(__dirname, "../videos/reiki");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = `reiki_${Math.floor(Date.now() * Math.random() * 1)}`;
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

routerMethods.post(
  "/create",
  upload.single("video-therapy"),
  (request, response) => {
    console.log(request.body.sessionId);
    const videoServices = new SubscriberService(request.file, response);
    videoServices.uploadNewVideo();
  }
);

module.exports = routerMethods;
