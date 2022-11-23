import { startGame } from "../../../services/game";

export default async function handler(req, res) {
  const game = await startGame();
  res.status(200).json(game);
}
