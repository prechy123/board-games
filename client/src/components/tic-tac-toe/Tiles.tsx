"use client";

import { useState } from "react";
import Tile from "./Tile";

export default function Tiles() {
  const [buttons, setButtons] = useState(Array(9).fill("-"));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleClick = (value: number) => {
    setButtons((prev) => {
      if (prev[value] !== "-") return prev;

      const newButtons = [...prev];
      newButtons[value] = currentPlayer;
      return newButtons;
    });
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };
  return (
    <div className=" inline-flex flex-col gap-10 backdrop:blur-xl rounded-lg overflow-hidden">
      <div className=" flex gap-10">
        <Tile value={buttons[0]} handleClick={() => handleClick(0)} />
        <Tile value={buttons[1]} handleClick={() => handleClick(1)} />
        <Tile value={buttons[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className=" flex gap-10">
        <Tile value={buttons[3]} handleClick={() => handleClick(3)} />
        <Tile value={buttons[4]} handleClick={() => handleClick(4)} />
        <Tile value={buttons[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className=" flex gap-10">
        <Tile value={buttons[6]} handleClick={() => handleClick(6)} />
        <Tile value={buttons[7]} handleClick={() => handleClick(7)} />
        <Tile value={buttons[8]} handleClick={() => handleClick(8)} />
      </div>
    </div>
  );
}
