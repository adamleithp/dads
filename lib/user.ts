import { authOptions } from "@/app/utils/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

// Define a type for the user with an id property
type UserWithId = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function getMeUser() {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  // Use type assertion to tell TypeScript that user has an id property
  const user = session.user as UserWithId;

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return dbUser;
}
