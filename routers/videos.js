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
const fields = [
  {
    name: "video-therapy",
    maxCount: 1,
  },
  {
    name: "video-flag",
    maxCount: 1,
  },
];
routerMethods.post("/create", upload.fields(fields), (request, response) => {
  const { files } = request;

  const videoServices = new SubscriberService(
    { video: files["video-therapy"][0], flag: files["video-flag"][0] },
    { ...request.body },
    response
  );
  videoServices.uploadNewVideo();
});

module.exports = routerMethods;
