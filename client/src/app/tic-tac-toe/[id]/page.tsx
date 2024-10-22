"use client";

import Tiles from "@/components/tic-tac-toe/Tiles";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import clipboard from "@/libs/utils/clipboard";
import * as motion from "framer-motion/client";
import { useSearchParams } from "next/navigation";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tic-tac-toe`);
export default function TicTacToe({ params }: { params: Params }) {
  const { id } = params;
  const [roomFull, setRoomFull] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  console.log(state);

  useEffect(() => {
    socket.emit("joinRoom", id);
  }, [id]);

  useEffect(() => {
    socket.emit("joinRoom", id);
    socket.on("playerJoined", (data) => {
      console.log("New player joined:", data);
      setRoomFull(true);
    });
    if (state === "join") {
      setCurrentPlayer("O");
      setRoomFull(true);
    }

    return () => {
      socket.off("playerJoined");
    };
  }, [id, state]);
  return roomFull ? (
    <div className="w-full flex justify-center">
      <Tiles gameCode={id} currentPlayer={currentPlayer} />
    </div>
  ) : (
    <div className=" text-center text-5xl">
      <p>Waiting for other player</p>
      <motion.div
        className=" flex justify-center items-center gap-1 mt-3 cursor-pointer"
        onClick={() => clipboard(id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <p className=" text-3xl">Room Code: {id}</p>
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C11.2347 0 10.6293 0.125708 10.1567 0.359214C9.9845 0.44429 9.82065 0.544674 9.68861 0.62717L9.59036 0.688808C9.49144 0.751003 9.4082 0.803334 9.32081 0.853848C9.09464 0.984584 9.00895 0.998492 9.00053 0.999859C8.99983 0.999973 9.00019 0.999859 9.00053 0.999859C7.89596 0.999859 7 1.89543 7 3H6C4.34315 3 3 4.34315 3 6V20C3 21.6569 4.34315 23 6 23H18C19.6569 23 21 21.6569 21 20V6C21 4.34315 19.6569 3 18 3H17C17 1.89543 16.1046 1 15 1C15.0003 1 15.0007 1.00011 15 1C14.9916 0.998633 14.9054 0.984584 14.6792 0.853848C14.5918 0.80333 14.5086 0.751004 14.4096 0.688804L14.3114 0.62717C14.1793 0.544674 14.0155 0.44429 13.8433 0.359214C13.3707 0.125708 12.7653 0 12 0ZM16.7324 5C16.3866 5.5978 15.7403 6 15 6H9C8.25972 6 7.61337 5.5978 7.26756 5H6C5.44772 5 5 5.44772 5 6V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V6C19 5.44772 18.5523 5 18 5H16.7324ZM11.0426 2.15229C11.1626 2.09301 11.4425 2 12 2C12.5575 2 12.8374 2.09301 12.9574 2.15229C13.0328 2.18953 13.1236 2.24334 13.2516 2.32333L13.3261 2.37008C13.43 2.43542 13.5553 2.51428 13.6783 2.58539C13.9712 2.75469 14.4433 3 15 3V4H9V3C9.55666 3 10.0288 2.75469 10.3217 2.58539C10.4447 2.51428 10.57 2.43543 10.6739 2.37008L10.7484 2.32333C10.8764 2.24334 10.9672 2.18953 11.0426 2.15229Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  );
}
