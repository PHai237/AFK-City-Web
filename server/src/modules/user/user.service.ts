import { prisma } from "../../config/db";

export async function getMeService(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    level: user.level,
    exp: user.exp,
    gold: user.gold,
    createdAt: user.createdAt,
  };
}
