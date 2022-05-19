import { FC, useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import TONER from "./TONER";
import * as Tone from "tone";
const kick = require("./kick.wav");
const hat = require("./hat.wav");
const snare = require("./snare.wav");
const kickLoop = require("./kickloop.wav");
const beatLoop1 = require("./beatloop1.wav");
const hatLoop = require("./hatloop.wav");

const App = () => {
  const [sounds, setSounds] = useState({
    kickLoopState: false,
    beatLoopState: false,
  });
  const [selected, setSelected] = useState();
  Tone.Transport.bpm.value = 135;

  console.log("BPM: " + Tone.Transport.bpm.value);

  const handleLoop: any = (selected: any) => {
    const Player = new Tone.Player(selected).toDestination();
    Tone.loaded().then(() => {
      setSounds({ ...sounds, beatLoopState: !sounds.beatLoopState });

      new Tone.Loop((time) => {
        console.log(time);
        if (time > 0) {
          Player.start();
        } else {
          Player.stop();
        }
      }, "1n").start();
      Tone.Transport.start();
      Tone.start();
    });
  };
  useEffect(() => {
    console.log("tsport", Tone.Transport);
  }, [Tone.Transport]);
  return (
    <div className="App">
      <TONER />
      <button onClick={() => handleLoop(hatLoop)}>Hat</button>
    </div>
  );
};

export default App;
