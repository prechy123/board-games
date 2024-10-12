import Image from "next/image";
import { useEffect, useState } from "react";
import * as api from "@/services/gameApi";

const PlayersCard = ({ gameCode }: { gameCode: string }) => {
  const [player1, setPlayer1] = useState({
    userName: "-",
    profilePictureUrl:
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg",
  });
  const [player2, setPlayer2] = useState({
    userName: "-",
    profilePictureUrl:
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg",
  });

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
      </div>
    </div>
  );
};

export default PlayersCard;
