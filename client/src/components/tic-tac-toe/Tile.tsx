"use client";

import "./tile.css";
import * as motion from "framer-motion/client";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export default function Tile({
  value,
  handleClick,
}: {
  value: string;
  handleClick: () => void;
}) {
  return (
    <motion.span
      className=" w-16 sm:w-24 h-16 sm:h-24 bg-black dark:bg-white text-red-500 text-3xl flex items-center justify-center cursor-pointer"
      onClick={handleClick}
      whileHover={{scale: 1.2, backgroundColor: "#e0e0e0"}}
      whileTap={{scale: 0.9, backgroundColor: "#cccccc"}}
    >
      {value === "-" ? (
        value
      ) : (
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          initial="hidden"
          animate="visible"
        >
          {value === "O" ? (
            <motion.circle
              cx="150"
              cy="150"
              r="80"
              stroke="#3b82f6"
              variants={draw}
              custom={0}
            />
          ) : (
            <>
              <motion.line
                x1="75"
                y1="75"
                x2="225"
                y2="225"
                stroke="#ec4899"
                variants={draw}
                custom={0}
              />
              <motion.line
                x1="75"
                y1="225"
                x2="225"
                y2="75"
                stroke="#ec4899"
                variants={draw}
                custom={0.5}
              />
            </>
          )}
        </motion.svg>
      )}
    </motion.span>
  );
}
