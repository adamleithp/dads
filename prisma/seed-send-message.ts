// seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // get user adamleithp@me.com
  const user = await prisma.user.findUnique({
    where: {
      email: "adamleithp@me.com",
    },
  });

  // const get a friend
  const friend = await prisma.user.findUnique({
    where: {
      email: "joe@example.com",
    },
  });

  if (!user || !friend) {
    console.error("User or friend not found");
    return;
  }

  let friendship;

  // check if friendship exists
  friendship = await prisma.friendship.findUnique({
    where: {
      user1Id_user2Id: {
        user1Id: user.id,
        user2Id: friend.id,
      },
      OR: [
        {
          user1Id: user.id,
          user2Id: friend.id,
        },
        {
          user1Id: friend.id,
          user2Id: user.id,
        },
      ],
    },
  });

  if (!friendship) {
    // create friendship
    friendship = await prisma.friendship.create({
      data: {
        user1Id: user.id,
        user2Id: friend.id,
        status: "ACCEPTED",
      },
    });
  }

  // send a message to the friend
  const message1 = await prisma.message.create({
    data: {
      content: "Hey Joe, how are you?",
      senderId: user.id,
      friendshipId: friendship.id,
    },
  });
  const message2 = await prisma.message.create({
    data: {
      content: "Hey Adam, I'm good thanks!",
      senderId: friend.id,
      friendshipId: friendship.id,
    },
  });
  const message3 = await prisma.message.create({
    data: {
      content: "Let's go to the pub later? I'm free.",
      senderId: user.id,
      friendshipId: friendship.id,
    },
  });

  console.log("Messages sent");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
