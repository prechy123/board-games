import * as motion from "framer-motion/client";

export default function TicTacToe() {
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
            />
            <motion.button
              type="button"
              className="text-white bg-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 "
              whileTap={{ scale: 0.9 }}
            >
              Join Game
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
