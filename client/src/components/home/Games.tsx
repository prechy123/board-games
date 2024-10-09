"use client";

import { useRouter } from "next/navigation";
import * as motion from "framer-motion/client";
import showToast from "@/libs/utils/showToast";

const gamesVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const gameVariants = {
  hidden: { opacity: 0, x: 20, rotate: 8 },
  visible: { opacity: 1, x: 0, rotate: 0 },
};

export function Games() {
  const route = useRouter();
  // temporary variable
  const games = [
    { title: "Tic Tac Toe", link: "tic-tac-toe" },
    { title: "Chess", link: "/" },
    { title: "Checkers", link: "/" },
    { title: "Scrabble", link: "/" },
    { title: "Ludo", link: "/" },
  ];
  const handleButtonPressed = (link: string) => {
    if (link === "/")
      return showToast("info", "Currently not available, try Tic Tac Toe");
    route.push(link);
  };
  return (
    <motion.div variants={gamesVariants} initial="hidden" animate="visible">
      {games.map((game) => (
        <motion.button
          type="button"
          className=" w-full text-white bg-blue-700 font-medium rounded-full text-sm py-5 text-center me-2 mb-2 dark:bg-blue-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          key={game.title}
          onClick={() => handleButtonPressed(game.link)}
          variants={gameVariants}
        >
          {game.title}
        </motion.button>
      ))}
    </motion.div>
  );
}
