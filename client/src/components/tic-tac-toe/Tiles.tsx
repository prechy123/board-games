"use client";

import { useEffect, useState } from "react";
import Tile from "./Tile";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/user";
import showToast from "@/libs/utils/showToast";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tic-tac-toe`);
export default function Tiles({ gameCode }: { gameCode: string }) {
  const { playerId } = useSelector((state: RootState) => state.auth);
  const [playerTurn, setPlayerTurn] = useState("defaultPlayerId");
  const [buttons, setButtons] = useState<string[][]>([
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  useEffect(() => {
    socket.emit("joinRoom", gameCode);
  }, [gameCode]);

  const handleClick = (x: number, y: number) => {
    if (playerTurn !== playerId) {
      if (playerTurn !== "defaultPlayerId") {
        showToast("info", "It is not your turn");
        return;
      }
    }
    setButtons((prev) => {
      if (prev[x][y] !== "-") return prev;

      const newButtons = [...prev];
      newButtons[x][y] = currentPlayer;
      console.log(newButtons);
      socket.emit("makeMove", {
        playerId,
        gameCode,
        newTiles: newButtons,
      });
      return newButtons;
    });
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };
  useEffect(() => {
    socket.on("updateGame", (data) => {
      console.log(data);
      setButtons(data.game);
      setPlayerTurn(data.playerTurn);
    });

    socket.on("error", (data) => {
      // toast.dismiss();
      showToast("error", data);
    });
  }, []);
  const createGame = () => {
    console.log(playerId);
    // socket.emit("createGame", { playerId });
    // socket.emit("joinGame", { playerId: "67054fdb8eb8456bef3153f4", gameCode: "981868" });
    // socket.emit("makeMove", {
    //   playerId: "67054fdb8eb8456bef3153f4",
    //   gameCode: "981868",
    //   newTiles: [
    //     ["O", "O", "X"],
    //     ["-", "O", "X"],
    //     ["-", "-", "X"],
    //   ],
    // });
  };
  // useEffect(() => {
  //   socket.on("joinedGame", (data) => {
  //     console.log("Joined game:", data);
  //   });
  //   socket.on("error", (message) => {
  //     console.error("Error:", message);
  //   });
  // }, [socket]);
  return (
    <div>
      <button onClick={createGame} className=" flex flex-col">
        Create Game
      </button>
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
    </div>
  );
}
