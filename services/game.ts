import { prisma } from "./db";

export const startGame = async () => {
  return prisma.game.findFirst({ include: { gameMode: true } });
};
