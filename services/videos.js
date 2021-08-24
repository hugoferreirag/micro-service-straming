const modelVideos = require("../models/videos");
const modelSessions = require("../models/sessions");
const ObjectId = require("mongodb").ObjectId;

const ResponseService = require("./response");

class Videos {
  constructor(video, response) {
    this.video = video;
    this.responseService = new ResponseService(response);
    this.keys = [];
  }

  async uploadNewVideo() {
    try {
      await this.#validateDataReceived();
      await this.#checkAllKeysExistsInModelReceived();
      await this.#checkVideoExistsInDb();

      const { _doc } = await modelVideos.connectDb.create(this.video);
      this.responseService.handleSuccess(
        this.responseService.STATUS_NAME.SUCCESS_CREATED,
        "Video cadastrado com sucesso.",
        _doc
      );
    } catch (error) {
      this.responseService.handleError(
        error.statusName,
        error.message,
        error.input
      );
    }
  }
  async getAllVideoPerSessions() {
    try {
      const allVideos = await modelVideos.connectDb.find({ deletedAt: null });

      const allSessions = await modelSessions.connectDb.find({
        deletedAt: null,
      });

      const showcasePerSession = allSessions.map((session) => {
        const videosOfCurrentSession = allVideos.filter(
          (video) => video.sessionId == session._id
        );
        return {
          _id: session._id,
          sessionName: session.name,
          description: session.description,
          locked: session.locked,
          videos: videosOfCurrentSession,
        };
      });

      this.responseService.handleSuccess(
        this.responseService.STATUS_NAME.SUCCESS,
        "Vitrine das sessões de reiki",
        showcasePerSession
      );
    } catch (error) {
      this.responseService.handleError(
        this.responseService.STATUS_NAME.SERVICE,
        "error system",
        "not input"
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
    Object.entries(this.video).map(([key, value]) => {
      if (!key || !modelVideos.modelKeys.includes(key))
        throw {
          input: key,
          statusName: this.responseService.STATUS_NAME.CLIENT,
          message: this.responseService.mountErrorMessageForIrregularKey(key),
        };
      if (key !== "locked" && !value)
        throw {
          input: key,
          statusName: this.responseService.STATUS_NAME.CLIENT,
          message: this.responseService.mountErrorMessageForIrregularKey(key),
        };
      this.keys.push(key);
    });
  }

  async #checkVideoExistsInDb() {
    const videoExists = await modelVideos.connectDb.findOne({
      sessionId: ObjectId(this.video.sessionId),
      videoName: this.video.videoName,
    });
    if (videoExists)
      throw {
        input: "videoName, sessionId",
        statusName: this.responseService.STATUS_NAME.CLIENT,
        message: this.responseService.mountErrorMessageForRegisterExistsInDb(
          "videoName, sessionId"
        ),
      };
  }
}

module.exports = Videos;
