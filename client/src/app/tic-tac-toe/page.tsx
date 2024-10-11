"use client";

import showToast from "@/libs/utils/showToast";
import { RootState } from "@/types/user";
import * as motion from "framer-motion/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tic-tac-toe`);
export default function TicTacToe() {
  const route = useRouter();
  const { playerId } = useSelector((state: RootState) => state.auth);
  const [gameCode, setGameCode] = useState("");
  const [joining, setJoining] = useState(false);

  const createGame = () => {
    showToast("loading", "Creating Game");
    socket.emit("createGame", { playerId });
  };

  const joinGame = () => {
    showToast("loading", "Joining Game");
    setJoining(true);
    socket.emit("joinGame", { playerId, gameCode });
  };

  useEffect(() => {
    socket.on("joinedGame", (data) => {
      toast.dismiss();
      // showToast("success", "Joined Game");
      if (joining) {
        route.push(`tic-tac-toe/${data.gameCode}?state=join`);
      } else {
        route.push(`tic-tac-toe/${data.gameCode}?state=create`);
      }
    });

    socket.on("error", (data) => {
      toast.dismiss();
      showToast("error", data);
    });

    return () => {
      socket.off("joinedGame");
    };
  }, [route, joining]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <h1 className=" text-center mb-5 text-3xl sm:text-4xl">Tic Tac Toe</h1>
      <div className="w-full flex justify-center">
        <div className=" w-1/2 sm:w-1/4">
          <motion.button
            type="button"
            className=" w-full text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600"
            whileTap={{ scale: 0.9 }}
            onClick={createGame}
          >
            Create Game
          </motion.button>
          <div className=" flex items-center justify-evenly">
            <span className=" h-[1px] bg-white w-[35%]"></span>
            <p>OR</p>
            <span className=" h-[1px] bg-white w-[35%]"></span>
          </div>
          <div className=" flex items-center justify-center flex-col sm:flex-row gap-3">
            <motion.input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 outline-none"
              placeholder="Enter Code"
              required
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onChange={(e) => setGameCode(e.target.value)}
              value={gameCode}
            />
            <motion.button
              type="button"
              className="text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 "
              whileTap={{ scale: 0.9 }}
              onClick={joinGame}
            >
              Join Game
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
