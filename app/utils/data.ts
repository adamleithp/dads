"use server";

import { getMeUser } from "@/lib/user";
import { Prisma, User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import prisma from "./prisma";

function handlePrismaError(error: any): { error: string; code?: string } {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          error: "A unique constraint failed. This record already exists.",
          code: error.code,
        };
      case "P2025":
        return { error: "Record not found.", code: error.code };
      case "P2003":
        return { error: "Foreign key constraint failed.", code: error.code };
      // Add more specific error codes as needed
      default:
        return { error: `Database error: ${error.message}`, code: error.code };
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return { error: "Invalid data provided: " + error.message };
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      error: "Failed to initialize database connection: " + error.message,
    };
  } else {
    return {
      error:
        "An unexpected error occurred: " + (error.message || String(error)),
    };
  }
}

export const getUserFriends = async (): Promise<User[]> => {
  const meUser = await getMeUser();
  if (!meUser?.id) {
    throw new Error("User not found");
  }

  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [{ user1Id: meUser.id }, { user2Id: meUser.id }],
      status: "ACCEPTED",
    },
    include: {
      user1: true,
      user2: true,
    },
  });
  // Filter out the current user and map to return only the friend's data
  const friends = friendships.map((friendship) => {
    const friend =
      friendship.user1Id === meUser.id ? friendship.user2 : friendship.user1;
    return friend;
  });
  return friends;
};

export const getPotentialFriends = async (): Promise<User[]> => {
  const meUser = await getMeUser();
  if (!meUser?.id) throw new Error("User not found");

  const users = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: meUser.id } },
        {
          OR: [
            {
              friendsAsUser1: {
                some: { user2Id: meUser.id, status: { not: "ACCEPTED" } },
              },
            },
            {
              friendsAsUser2: {
                some: { user1Id: meUser.id, status: { not: "ACCEPTED" } },
              },
            },
            {
              NOT: {
                OR: [
                  { friendsAsUser1: { some: { user2Id: meUser.id } } },
                  { friendsAsUser2: { some: { user1Id: meUser.id } } },
                ],
              },
            },
          ],
        },
      ],
    },
  });
  return users;
};

export const getFriendStatus = async (userId: string) => {
  const meUser = await getMeUser();
  if (!meUser?.id) throw new Error("User not found");

  const friendship = await prisma.friendship.findUnique({
    where: {
      user1Id_user2Id: {
        user1Id: meUser.id,
        user2Id: userId,
      },
      OR: [
        { user1Id: meUser.id, user2Id: userId },
        { user1Id: userId, user2Id: meUser.id },
      ],
    },
  });
  return friendship;
};

export const addFriend = async (userId: string) => {
  const meUser = await getMeUser();
  if (!meUser?.id) throw new Error("User not found");

  try {
    const friendship = await prisma.friendship.create({
      data: {
        user1Id: meUser.id,
        user2Id: userId,
        status: "PENDING",
      },
    });

    revalidateTag("friends");
    return friendship;
  } catch (error) {
    return handlePrismaError(error);
  }
};

export const removeFriend = async (userId: string) => {
  const meUser = await getMeUser();
  if (!meUser?.id) return { error: "User not found" };

  try {
    const friendship = await prisma.friendship.delete({
      where: {
        user1Id_user2Id: {
          user1Id: meUser.id,
          user2Id: userId,
        },
      },
    });

    revalidateTag("friends");
    return friendship;
  } catch (error) {
    return handlePrismaError(error);
  }
};
