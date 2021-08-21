const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const fs = require("fs");
require("../config/db");
const pp = path.join(
  __dirname,
  "../videos/reiki/reiki_328684336447-alpaca-nadiamik.png"
);
const promise = mongoose.connect(process.env.DB, { useNewUrlParser: true });

const conn = mongoose.connection;
let gfs;

conn.once("open", async (event) => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  const ba = await conn.db
    .collection("uploads.chunks")
    .findOne({ _id: ObjectId("61201e6aa360cb9488a97289") });

  console.log(ba);

  //   const writeStram = gfs.createWriteStream({
  //     filename: `'${Date.now()}.mp4'`,
  //   });

  //   fs.createReadStream(pp).pipe(writeStram);
  //   writeStram.on("close", (file) => console.log(file.filename + "Pronto"));
});

//create storage object
const storage = new GridFsStorage.GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const okok = async () => await storage.ready();
const papa = okok();
console.log(papa);
const upload = multer({ storage: storage });

module.exports = upload;
