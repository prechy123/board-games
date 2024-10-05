"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import Image from "next/image";
import sun_and_moon from "./sun_and_moon.png";
import logo from "./logo.png";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: [0, 0.3, 0.6, 0.7, 1],
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: 20, rotate: 30 },
  visible: { opacity: 1, x: 0, rotate: 0 },
};

export default function Header() {
  const { setTheme } = useTheme();
  const [themeDropDown, setThemeDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="absolute top-0 z-10 w-full">
      <div className=" flex justify-between items-center h-[70px] px-5 sm:px-10">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          <Link href={"/"}>
            <Image src={logo} alt="Board Games" width={120} height={120} />
          </Link>
        </motion.div>
        <div
          className="relative"
          onMouseEnter={() => setThemeDropdown(true)}
          onMouseLeave={() => setThemeDropdown(false)}
        >
          <motion.p
            className=" cursor-pointer relative z-20"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <Image src={sun_and_moon} width={64} height={64} alt="theme" />
          </motion.p>
          {themeDropDown && (
            <motion.div
              className="absolute top-10 right-10 bg-black dark:bg-white text-white dark:text-black w-20 text-center p-2 rounded px-4 shadow-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                onClick={() => {
                  setTheme("light");
                  setThemeDropdown(false);
                }}
                className=" cursor-pointer mb-1 hover:font-bold"
                variants={childVariants}
              >
                Light
              </motion.p>
              <motion.p
                onClick={() => {
                  setTheme("dark");
                  setThemeDropdown(false);
                }}
                className=" cursor-pointer hover:font-bold"
                variants={childVariants}
              >
                Dark
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}
