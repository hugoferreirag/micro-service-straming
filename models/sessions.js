const mongoose = require("mongoose");
require("../config/db");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    lock: {
      type: Boolean,
      required: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const connectDb = mongoose.model("sessionsModel", schema);

const modelKeys = ["name"];

module.exports = {
  modelKeys,
  connectDb,
};
