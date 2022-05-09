import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";

import * as Tone from "tone";
const kick = require("./kick.wav");
const hat = require("./hat.wav");
const snare = require("./snare.wav");
const kickLoop = require("./kickloop.wav");
const beatLoop1 = require("./beatloop1.wav");

function App() {
  const [sounds, setSounds] = useState({
    kickLoopState: false,
    beatLoopState: false,
  });
  const [beatlooper, setBeatlooper] = useState;
  Tone.Transport.bpm.value = 135;

  console.log("BPM: " + Tone.Transport.bpm.value);

  const handleKick = () => {
    const kickPlayer = new Tone.Player(kick).toDestination();
    Tone.loaded().then(() => {
      kickPlayer.start();
    });
  };
  const handleHat = () => {
    const hatPlayer = new Tone.Player(hat).toDestination();
    Tone.loaded().then(() => {
      hatPlayer.start();
    });
  };
  const handleSnare = () => {
    const snarePlayer = new Tone.Player(snare).toDestination();
    Tone.loaded().then(() => {
      snarePlayer.start();
    });
  };
  const handleKickLoop = () => {
    const player = new Tone.Player(kickLoop).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  };
  const handleBeatLoop1 = () => {
    const beatOnePlayer = new Tone.Player(beatLoop1).toDestination();
    Tone.loaded().then(() => {
      setSounds({ ...sounds, beatLoopState: !sounds.beatLoopState });

      new Tone.Loop((time) => {
        if (sounds.beatLoopState === true && time > 0) {
          console.log(sounds.beatLoopState);
          beatOnePlayer.start();
        } else {
          beatOnePlayer.stop();
        }
      }, "1n").start(0);
      Tone.Transport.start();
      Tone.start();
    });
  };

  return (
    <div className="App">
      <button onClick={handleKick}>KICK</button>
      <button onClick={handleHat}>HAT</button>
      <button onClick={handleSnare}>SNARE</button>
      <button onClick={handleKickLoop}>KickLoop</button>
      <button onClick={handleBeatLoop1}>Beat</button>
    </div>
  );
}

export default App;
function beatLoopState(arg0: any, beatLoopState: any, arg2: boolean) {
  throw new Error("Function not implemented.");
}
