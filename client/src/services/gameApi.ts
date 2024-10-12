const BASE = "game";

interface ITicTacToeRes {
  game: {
    player1: {
      userName: string;
      profilePictureUrl: string;
    };
    player2: {
      userName: string;
      profilePictureUrl: string;
    };
  };
}

export const getTicTacToeGamePlayers = async (gameCode: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${BASE}/tic-tac-toe/find/${gameCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res: ITicTacToeRes = await response.json();
    if (res) {
      return {
        player1: res.game.player1,
        player2: res.game.player2,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
