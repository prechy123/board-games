import { Games } from "@/components/home/Games";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <motion.div
      className="mx-auto text-center flex justify-center flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <h2 className=" text-3xl sm:text-4xl mb-3">
        Welcome to <span className=" font-bold">BOARD GAMES</span>
      </h2>
      <div className=" w-3/5 sm:w-1/4 ">
        <Games />
      </div>
    </motion.div>
  );
}
