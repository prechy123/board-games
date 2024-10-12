import * as gameRepository from "../repositories/gameRepository.js";

export const findTicTacToeGame = async (
  gameCode: string,
) => {
  const game = await gameRepository.findTicTacToeByGameCode(gameCode);
  if (!game) {
    return null;
  }
  return game;
};
