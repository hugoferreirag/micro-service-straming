const ResponseService = require("./response");
const modelSessions = require("../models/sessions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Sessions {
  constructor(session, response) {
    this.session = session;
    this.responseService = new ResponseService(response);
  }
  async createSession() {
    try {
      this.#validatePayloadReceived();
      await this.#checkSessionExists();
      const newSession = await modelSessions.connectDb.create(this.session);
      this.responseService.handleSuccess(
        this.responseService.STATUS_NAME.SUCCESS_CREATED,
        "Sessão criada com sucesso.",
        newSession._doc
      );
    } catch (error) {
      this.responseService.handleError(
        error.statusName,
        error.message,
        error.input
      );
    }
  }
  #validatePayloadReceived() {
    if (!this.session.name)
      throw {
        statusName: this.responseService.STATUS_NAME.CLIENT,
        input: "name",
        message: this.responseService.mountErrorMessageForIrregularKey(
          "name",
          this.session.name
        ),
      };
  }
  async #checkSessionExists() {
    const sessionExists = await modelSessions.connectDb.findOne({
      name: this.session.name,
    });
    console.log(sessionExists);
    if (sessionExists)
      throw {
        statusName: this.responseService.STATUS_NAME.CLIENT,
        input: "name",
        message: this.responseService.mountErrorMessageForRegisterExistsInDb(
          "name",
          this.session.name
        ),
      };
  }
}

module.exports = Sessions;
