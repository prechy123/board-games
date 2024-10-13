import Image from "next/image";
import { useEffect, useState } from "react";
import * as api from "@/services/gameApi";
import showToast from "@/libs/utils/showToast";

interface IPlayerCard {
  gameCode: string;
  winner: string;
}
const PlayersCard = ({ gameCode, winner }: IPlayerCard) => {
  const [player1, setPlayer1] = useState({
    _id: "1",
    userName: "-",
    profilePictureUrl:
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg",
  });
  const [player2, setPlayer2] = useState({
    _id: "2",
    userName: "-",
    profilePictureUrl:
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg",
  });

  useEffect(() => {
    if (winner) {
      let winnerUsername: string;
      if (player1._id === winner) {
        winnerUsername = player1.userName;
      } else {
        winnerUsername = player2.userName;
      }
      showToast("info", `The winner of the game is ${winnerUsername}`);
    }
  }, [winner, player1._id, player2.userName, player1.userName]);

  useEffect(() => {
    const handleFetchPlayers = async () => {
      const res = await api.getTicTacToeGamePlayers(gameCode);
      if (!res) return;
      setPlayer1(res.player1);
      setPlayer2(res.player2);
    };
    handleFetchPlayers();
  }, [gameCode]);

  return (
    <div className=" flex justify-around items-center mt-4">
      <div>
        <Image
          src={player1.profilePictureUrl}
          width={70}
          height={70}
          alt="Player 1"
          className=" rounded-full w-[70px] h-[70px] object-cover"
        />
        <p className=" text-center">{player1.userName}</p>
        {/* {playerTurn === player1._id && <span className=" w-full h-2 bg-slate-700 block"></span>}
        {playerTurn === "defaultPlayerId" && <span className=" w-full h-2 bg-slate-700 block"></span>} */}
      </div>
      <p className=" text-2xl font-bold">VS</p>
      <div>
        <Image
          src={player2.profilePictureUrl}
          width={70}
          height={70}
          alt="Player 2"
          className=" rounded-full w-[70px] h-[70px] object-cover"
        />
        <p className=" text-center">{player2.userName}</p>
        {/* {playerTurn === player2._id && <span className=" w-full h-2 bg-slate-700 block"></span>} */}
      </div>
    </div>
  );
};

export default PlayersCard;
