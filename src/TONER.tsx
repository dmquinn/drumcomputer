import React, { useState, useEffect } from "react";
import "./index.css";
import * as Tone from "tone";
import classNames from "classnames";

interface props {
  onClick: (e: Event) => void;
}
function GenerateGrid() {
  const grid = [];
  for (let i = 0; i < 8; i++) {
    let column = [
      { note: "C", isActive: false },
      { note: "D#", isActive: false },
      { note: "G", isActive: false },
      { note: "A", isActive: false },
      { note: "C#", isActive: false },
    ];
    grid.push(column);
  }
  return grid;
}

const CHOSEN_OCTAVE = "3";

export default function App() {
  const [grid, setGrid] = useState(GenerateGrid());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [synthType, setSynthType] = useState("sine");

  const synth = new Tone.PolySynth().toDestination();

  function handleNoteClick(clickedColumn: number, clickedNote: number) {
    let updatedGrid = grid.map((column, columnIndex) =>
      column.map((cell, cellIndex) => {
        let cellCopy = cell;

        if (columnIndex === clickedColumn && cellIndex === clickedNote) {
          cellCopy.isActive = !cell.isActive;
        }

        return cellCopy;
      })
    );

    setGrid(updatedGrid);
  }

  const PlayMusic = async () => {
    let music: (Tone.Unit.Frequency | Tone.Unit.Frequency[])[] | any[][] = [];

    grid.map((column) => {
      let columnNotes: (Tone.Unit.Frequency | Tone.Unit.Frequency[]) & any[] =
        [];
      column.map(
        (shouldPlay) =>
          shouldPlay.isActive &&
          columnNotes.push(shouldPlay.note + CHOSEN_OCTAVE)
      );
      music.push(columnNotes);
    });

    await Tone.start();

    const Sequencer = new Tone.Sequence(
      (time, column) => {
        setCurrentColumn(column);

        synth.triggerAttackRelease(music[column], "8n", time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "8n"
    );

    if (isPlaying) {
      // Turn of our player if music is currently playing
      setIsPlaying(false);
      setCurrentColumn(0);

      await Tone.Transport.stop();
      await Sequencer.stop();
      await Sequencer.clear();
      await Sequencer.dispose();

      return;
    }
    setIsPlaying(true);
    // Toggles playback of our musical masterpiece
    await Sequencer.start();
    await Tone.Transport.start();
  };

  useEffect(() => {
    console.log(currentColumn);
  }, [currentColumn]);
  return (
    <div className="App">
      <div className="note-wrapper">
        {grid.map((column, columnIndex) => (
          <div
            className={classNames("note-column", {
              "note-column--active": currentColumn === columnIndex,
            })}
            key={columnIndex + "column"}
          >
            {column.map(({ note, isActive }, noteIndex) => (
              <NoteButton
                note={note}
                isActive={isActive}
                onClick={() => handleNoteClick(columnIndex, noteIndex)}
                key={note + columnIndex}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="play-button" onClick={() => PlayMusic()}>
        {isPlaying ? (
          <i className="fas fa-pause">PAUSE</i>
        ) : (
          <i className="fas fa-play">PLAY</i>
        )}
      </button>
      {/* <div className="types">
        <button value="sine" onClick={handleChangeType}>
          TYPE
        </button>{" "}
        <button value="square" onClick={handleChangeType}>
          TYPE
        </button>{" "}
        <button value="sawtooth" onClick={handleChangeType}>
          TYPE
        </button>{" "}
      </div> */}
    </div>
  );
}
interface props {
  note: string;
  isActive: boolean;
  onClick: (e: Event) => void;
}
const NoteButton: React.FC<props> = ({ note, isActive, ...rest }) => {
  const handleClick = () => {
    console.log("done");
  };
  const classes = isActive ? "note note--active" : "note";
  return (
    <>
      <button className={classes} {...rest} onClick={handleClick}></button>
    </>
  );
};
