const modelVideos = require("../models/videos");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("../utils");
const fs = require("fs");
const ResponseService = require("./response");
const Vimeo = require("vimeo").Vimeo;

class Videos {
  constructor(files, videoInfo, response) {
    this.files = files;
    this.videoInfo = videoInfo;
    this.responseService = new ResponseService(response);
    this.vimeo = new Vimeo(
      "60178843f4405793eeb0a87ed69c670ff27a0050",
      "pciOlZEK877VSEqw8hqTwrc3ZGZVjzc8KdVQNbnSOWvLG3QVPhUZ1H2FXNPzobF9B/HCPZszwXw2aR01aITs5rYEBEcgx2jWRivY2NUvZpd1/B50jsJ64dhFOaCplMZg",
      "48fefa3b22e87ade1bdc0222b341a381"
    );
  }

  async uploadNewVideo() {
    try {
      await this.#checkAllKeysExistsInModelReceived();
      await this.#validateDataReceived();
      this.vimeo.upload(
        this.files.video.path,
        {
          name: this.videoInfo.videoName,
          description: this.videoInfo.videoDescription,
        },
        function (uri) {
          console.log("Your video URI is: " + uri);
        },
        function (bytes_uploaded, bytes_total) {
          var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
          console.log(bytes_uploaded, bytes_total, percentage + "%");
        },
        function (error) {
          console.log("Failed because: " + error);
        }
      );
    } catch (error) {
      this.responseService.handleError(
        error.statusName,
        error.message,
        error.input
      );
    }
  }
  async #checkAllKeysExistsInModelReceived() {
    modelVideos.modelKeys.map((key) => {
      if (!this.keys.includes(key))
        throw {
          input: key,
          statusName: this.responseService.STATUS_NAME.CLIENT,
          message: this.responseService.mountErrorMessageForIrregularKey(key),
        };
    });
  }

  async #validateDataReceived() {
    Object.entries(this.videoInfo).map(([key, value]) => {
      console.log(key, value);
      if (!key || !modelVideos.modelKeys.includes(key))
        throw {
          input: key,
          statusName: this.responseService.STATUS_NAME.CLIENT,
          message: this.responseService.mountErrorMessageForIrregularKey(key),
        };
      if (!value)
        throw {
          input: key,
          statusName: this.responseService.STATUS_NAME.CLIENT,
          message: this.responseService.mountErrorMessageForIrregularKey(key),
        };
      this.keys.push(key);
    });
  }
}

module.exports = Videos;
