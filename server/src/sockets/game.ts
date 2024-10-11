import { Server, Socket } from "socket.io";
import TicTacToe from "../models/TicTacToe.js";
import { Types } from "mongoose";

function checkForWinner(tiles: string[][]) {
  const correct = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const flatTiles = tiles.flat();
  for (let i = 0; i < correct.length; i++) {
    const [x, y, z] = correct[i];
    if (
      flatTiles[x] !== "-" &&
      flatTiles[x] === flatTiles[y] &&
      flatTiles[y] === flatTiles[z]
    ) {
      return flatTiles[x];
    }
  }

  const allFilled = flatTiles.every((tile) => tile !== "-");

  if (allFilled) {
    return "draw";
  }
  return false;
}

export function TicTacToeNameSpace(io: Server) {
  const chatNamespace = io.of("/tic-tac-toe");
  chatNamespace.on("connection", (socket: Socket) => {
    console.log("A user connected to tic-tac-toe");
    socket.on("createGame", async (data: { playerId: string }) => {
      try {
        let game;
        let gameCode: string;
        do {
          gameCode = String(Math.floor(100000 + Math.random() * 900000));
          game = await TicTacToe.findOne({ gameCode: gameCode });
        } while (game);
        const playerObjectId: Types.ObjectId = new Types.ObjectId(
          data.playerId
        );
        const newGame = await TicTacToe.create({
          gameCode: gameCode,
          player1: playerObjectId,
          player2: null,
          playerTurn: playerObjectId,
        });
        await newGame.save();
        console.log(`Player ${data.playerId} joined game ${gameCode}`);

        socket.emit("joinedGame", {
          gameCode,
        });
        socket.join(gameCode);
        socket.emit("playerJoined", { playerId: data.playerId });
      } catch (error) {
        console.error(error);
        socket.emit("error", "An error occurred while creating the game");
      }
    });
    socket.on(
      "joinGame",
      async (data: { gameCode: string; playerId: string }) => {
        try {
          const game = await TicTacToe.findOne({ gameCode: data.gameCode });
          if (!game) {
            socket.emit("error", "Game not found");
            return;
          }
          if (game.player1 && game.player2) {
            return socket.emit("error", "Game is already full");
          }
          if (game.player1 == data.playerId || game.player2 == data.playerId) {
            return socket.emit("error", "you are already in the game");
          }
          const playerObjectId: Types.ObjectId = new Types.ObjectId(
            data.playerId
          );
          game.player2 = playerObjectId;
          game.save();
          socket.emit("joinedGame", {
            gameCode: data.gameCode,
          });
          socket.join(data.gameCode);
          socket
            .to(data.gameCode)
            .emit("playerJoined", { playerId: data.playerId });
        } catch (error) {
          console.error(error);
          socket.emit("error", "An error occurred while joining the game");
        }
      }
    );
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log("joined room");
    });
    socket.on(
      "makeMove",
      async (data: {
        gameCode: string;
        playerId: string;
        newTiles: string[][];
      }) => {
        try {
          const game = await TicTacToe.findOne({ gameCode: data.gameCode });
          console.log("data", data);
          if (!game) {
            socket.emit("error", "Game not found");
            return;
          }
          if (game.playerTurn.toString() !== data.playerId) {
            socket.emit("error", "It's not your turn");
            return;
          }
          game.tiles = data.newTiles;
          game.playerTurn =
            game.player1.toString() === data.playerId
              ? game.player2
              : game.player1;
          const winner = checkForWinner(game.tiles);
          if (winner === "draw") {
            socket.to(data.gameCode).emit("game-over", { winner: null });
            socket.emit("game-over", { winner: null });
          } else if (winner) {
            game.winner = data.playerId;
            await game.save();
            socket.to(data.gameCode).emit("game-over", { winner });
            socket.emit("game-over", { winner });
          }
          await game.save();

          socket.to(data.gameCode).emit("updateGame", {
            game: game.tiles,
            playerTurn: game.playerTurn,
            winner: game.winner,
          });
        } catch (error) {
          console.error(error);
          socket.emit("error", "An error occurred while updating the game");
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected from tic-tac-toe");
    });
  });
}
