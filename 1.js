const { Porcupine, BuiltinKeyword } = require("@picovoice/porcupine-node");
const { PvRecorder } = require("@picovoice/pvrecorder-node");

const porcupine = new Porcupine(
  "g7OCxUgX601LBLy3m9tzooLrir6mOiNTjLW7eU5nfo7PP8Gk2xIzhQ==",
  [BuiltinKeyword.COMPUTER],
  [0.5]
);

const frameLength = 512;
const recorder = new PvRecorder(frameLength);
async function start() {
  recorder.start();
  while (1) {
    const frames = await recorder.read();
    const index = porcupine.process(frames);
    if (index !== -1) {
      console.log(`Detected 'COMPUTER'`);
    }
  }
}

start();
console.log(`Listening for 'COMPUTER'...`);
process.stdin.resume();
console.log("Press ctrl+c to exit.");