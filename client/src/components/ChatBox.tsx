import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

interface Chat {
  sender?: string;
  receiver?: string;
  message: string;
}

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`);

export default function ChatBox({
  gameCode,
  currentPlayer,
}: {
  gameCode: string;
  currentPlayer: string;
}) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [chat, setChat] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    socket.emit("joinRoom", gameCode);
  }, [gameCode]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      inputRef.current?.focus();
      return;
    }

    setMessage("");
    setChat((prev) => [...prev, { sender: "Me", message }]);
    socket.emit("sendMessage", { message, sender: currentPlayer, gameCode });
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
      if (data.sender !== currentPlayer) {
        setChat((prev) => [
          ...prev,
          { receiver: data.sender, message: data.message },
        ]);
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [currentPlayer]);
  return (
    <div
      className={`fixed right-0 w-full sm:w-[380px] transition-all duration-500 ease-in-out ${
        open ? "bottom-0" : " -bottom-[76vh]"
      }`}
    >
      <div
        className=" flex justify-between items-center bg-gray-300 dark:bg-gray-700 p-2 rounded-t-xl cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2>Chat Room</h2>
        <p>
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 3C18.0523 2.99999 18.5 3.4477 18.5 3.99999L18.5001 15H21C21.4045 15 21.7691 15.2437 21.9239 15.6173C22.0787 15.991 21.9931 16.4211 21.7071 16.7071L17.7071 20.7071C17.3166 21.0977 16.6834 21.0977 16.2929 20.7071L12.2929 16.7071C12.0069 16.4211 11.9214 15.991 12.0761 15.6173C12.2309 15.2437 12.5956 15 13 15H15.5001L15.5 4.00002C15.5 3.44774 15.9477 3.00002 16.5 3.00001L17.5 3Z"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
            <path
              d="M3.00003 9C2.59557 9 2.23093 8.75636 2.07615 8.38268C1.92137 8.00901 2.00692 7.57889 2.29292 7.29289L5.5 4.08582V4H5.58582L6.29292 3.29289C6.68345 2.90237 7.31661 2.90237 7.70714 3.29289L8.41424 4H8.5V4.08576L11.7071 7.29289C11.9931 7.57889 12.0787 8.00901 11.9239 8.38268C11.7691 8.75636 11.4045 9 11 9H8.5L8.5 20C8.5 20.5523 8.05229 21 7.5 21H6.5C5.94772 21 5.5 20.5523 5.5 20L5.5 9H3.00003Z"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </svg>
        </p>
      </div>
      <div className=" h-[80vh] w-full bg-gray-300 dark:bg-gray-700 p-5">
        <div className=" h-[83%] bg-gray-800 dark:bg-gray-100 rounded-t-xl overflow-y-scroll p-2 scrollbar-hide pb-10">
          {chat.map((eachChat, index) => (
            <div
              key={eachChat.message}
              ref={index === chat.length - 1 ? lastMessageRef : null}
            >
              <p
                className={`text-gray-200 dark:text-gray-600 ${
                  eachChat.sender === "Me" && "text-right"
                } mt-1`}
              >
                <p className=" inline-block bg-gray-300 text-black dark:text-white dark:bg-gray-700 p-1 rounded-md max-w-[80%] break-words">
                  {eachChat.message}
                </p>
              </p>
            </div>
          ))}
        </div>
        <div className=" h-[15%]">
          <form onSubmit={handleSendMessage}>
            
            <div className="flex items-center py-2 rounded-t-lg bg-gray-300 dark:bg-gray-700">
              <textarea
                id="chat"
                rows={2}
                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none outline-none"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                ref={inputRef}
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-xl cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
