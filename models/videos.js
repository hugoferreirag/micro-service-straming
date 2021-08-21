const mongoose = require("mongoose");
require("../config/db");

const schema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    sessionName: {
      type: String,
      required: true,
    },
    videoName: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
      required: true,
    },
    videoFlag: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const connectDb = mongoose.model("videosModel", schema);

const modelKeys = [
  "sessionId",
  "sessionName",
  "videoName",
  "videoDescription",
  "locked",
];

module.exports = {
  modelKeys,
  connectDb,
};
