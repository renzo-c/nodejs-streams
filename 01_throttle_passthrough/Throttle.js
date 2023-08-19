const { Duplex } = require("stream");

class Throttle extends Duplex {
  constructor(ms = 1) {
    super();
    this.delay = ms;
  }

  _read() {}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _final() {
    this.push(null);
  }
}

module.exports = Throttle;
