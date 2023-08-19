const { createReadStream, createWriteStream } = require("fs");
const { PassThrough } = require("stream");
const Throttle = require("./Throttle");

const HIGH_WATERMARK = 16 * 1024; // bytes
const READ_ORIGIN = "./utils/stores.json";
const WRITE_DESTINATION = `${__dirname}/data.js`;

const readStream = createReadStream(READ_ORIGIN, {
  highWaterMark: HIGH_WATERMARK,
});
const writeStream = createWriteStream(WRITE_DESTINATION);

const reporter = new PassThrough();
const throttler = new Throttle(5);

let total = 0;
reporter.on("data", (chunk) => {
  console.log(`chunk #: ${total}, chunk length: ${chunk.length}`);
  total++;
});

readStream.pipe(throttler).pipe(reporter).pipe(writeStream);
