const { createReadStream, createWriteStream } = require("fs");
const { createGzip } = require("zlib");
const { pipeline } = require("stream");

const HIGH_WATERMARK = 1 * 1024; // bytes
const READ_ORIGIN = "./utils/data.js";
const WRITE_DESTINATION = `${__dirname}/data.js.gz`;

const gzip = createGzip();

const readStream = createReadStream(READ_ORIGIN, {
  highWaterMark: HIGH_WATERMARK,
});
const writeStream = createWriteStream(WRITE_DESTINATION);

pipeline(readStream, gzip, writeStream, (err) => {
  if (err) {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  }
});

