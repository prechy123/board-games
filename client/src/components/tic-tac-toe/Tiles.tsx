"use client";

import { useEffect, useState } from "react";
import Tile from "./Tile";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/user";
import showToast from "@/libs/utils/showToast";
import PlayersCard from "./PlayersCard";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tic-tac-toe`);
export default function Tiles({
  gameCode,
  currentPlayer,
}: {
  gameCode: string;
  currentPlayer: string;
}) {
  const { playerId } = useSelector((state: RootState) => state.auth);
  const [playerTurn, setPlayerTurn] = useState("defaultPlayerId");
  const [winner, setWinner] = useState("");
  const [buttons, setButtons] = useState<string[][]>([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);


  useEffect(() => {
    socket.emit("joinRoom", gameCode);
  }, [gameCode]);

  const handleClick = (x: number, y: number) => {
    if (winner) {
      showToast("info", "Game Over");
      return;
    }
    if (playerTurn !== "defaultPlayerId") {
      if (playerTurn !== playerId) {
        showToast("info", "It is not your turn");
        return;
      }
    }
    if (playerTurn === "defaultPlayerId") {
      if (currentPlayer === "O") {
        showToast("info", "You are not the starting player");
        return;
      }
    }

    setButtons((prev) => {
      if (prev[x][y] !== "-") {
        showToast("info", "Tiles has content")
        return prev;
      }

      const newButtons = prev.map((row) => [...row]);
      newButtons[x][y] = currentPlayer;
      socket.emit("makeMove", {
        playerId,
        gameCode,
        newTiles: newButtons,
      });
      setPlayerTurn("otherPlayer");
      return newButtons;
    });
  };
  useEffect(() => {
    socket.on("updateGame", (data) => {
      setButtons(data.game);
      setPlayerTurn(data.playerTurn);
    });

    socket.on("game-over", (data) => {
      setWinner(data.winner)
      // showToast("success", data);
    });
  }, []);

  return (
    <div>
      <div className=" inline-flex flex-col gap-10 backdrop:blur-xl rounded-lg overflow-hidden">
        <div className=" flex gap-10">
          <Tile value={buttons[0][0]} handleClick={() => handleClick(0, 0)} />
          <Tile value={buttons[0][1]} handleClick={() => handleClick(0, 1)} />
          <Tile value={buttons[0][2]} handleClick={() => handleClick(0, 2)} />
        </div>
        <div className=" flex gap-10">
          <Tile value={buttons[1][0]} handleClick={() => handleClick(1, 0)} />
          <Tile value={buttons[1][1]} handleClick={() => handleClick(1, 1)} />
          <Tile value={buttons[1][2]} handleClick={() => handleClick(1, 2)} />
        </div>
        <div className=" flex gap-10">
          <Tile value={buttons[2][0]} handleClick={() => handleClick(2, 0)} />
          <Tile value={buttons[2][1]} handleClick={() => handleClick(2, 1)} />
          <Tile value={buttons[2][2]} handleClick={() => handleClick(2, 2)} />
        </div>
      </div>
      <PlayersCard gameCode={gameCode} winner={winner} />
    </div>
  );
}
