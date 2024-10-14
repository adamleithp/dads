"use server";
import { getMeUser } from "@/lib/user";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import prisma from "./prisma";
function handlePrismaError(error: any): { error: string; code?: string } {
  console.error("Prisma error:", error);

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

export const addFriend = async (userId: string) => {
  const meUser = await getMeUser();
  if (!meUser?.id) return { error: "User not found" };

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
