// seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create three users: Adam, Joe, and Alex
  const userA = await prisma.user.create({
    data: {
      name: 'Adam',
    },
  });

  const userB = await prisma.user.create({
    data: {
      name: 'Joe',
    },
  });

  const userC = await prisma.user.create({
    data: {
      name: 'Alex',
    },
  });

  console.log('Users created:', { userA, userB, userC });

  // Create a friendship between User A (Adam) and User B (Joe)
  const friendshipAB = await prisma.friendship.create({
    data: {
      user1Id: userA.id,
      user2Id: userB.id,
      status: 'ACCEPTED',
    },
  });

  console.log('Friendship between Adam and Joe:', friendshipAB);

  // User A (Adam) creates a group and adds User B (Joe) to it
  const group = await prisma.group.create({
    data: {
      name: "Adam's Group",
      members: {
        create: [
          {
            userId: userA.id,
          },
          {
            userId: userB.id,
          },
        ],
      },
    },
  });

  console.log('Group created:', group);

  // User A sends a group message
  const message = await prisma.message.create({
    data: {
      content: 'Hi',
      senderId: userA.id,
      groupId: group.id,
    },
  });

  console.log('Message sent to group:', message);

  // Add User C (Alex) to the group after the first message
  const addUserCToGroup = await prisma.groupMember.create({
    data: {
      userId: userC.id,
      groupId: group.id,
    },
  });

  console.log('Alex added to group:', addUserCToGroup);

  // User A creates an event with the group
  const event = await prisma.event.create({
    data: {
      title: "Group's First Event",
      date: new Date('2024-12-01T10:00:00.000Z'), // Example date
      groupId: group.id,
    },
  });

  console.log('Event created for group:', event);

  // User A sends a message to Joe in their friendship (optional, but demonstrating friendship messages)
  const friendshipMessage = await prisma.message.create({
    data: {
      content: 'Hey Joe, how are you?',
      senderId: userA.id,
      friendshipId: friendshipAB.id, // Linking the message to the friendship
    },
  });

  console.log('Friendship message sent from Adam to Joe:', friendshipMessage);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
