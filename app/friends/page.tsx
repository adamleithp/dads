import prisma from "@/app/utils/prisma";
import { getMeUser } from "@/lib/user";

export default async function Friends() {
  const user = await getMeUser();

  const userId = user?.id; //
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { user1Id: userId }, // Find friendships where the current user is user1
        { user2Id: userId }, // Find friendships where the current user is user2
      ],
      status: 'ACCEPTED', // Only return friendships that are accepted
    },
    include: {
      user1: true,
      user2: true,
    },
  });

  console.log(userId, friendships);

  return (
    <div>
      <h1>My Friends</h1>
      {friendships.length > 0 ? (
        <ul>
          {friendships.map((friend) => (
            <li key={friend.id}>
              {friend.user1.name} ({friend.user1.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>You don't have any friends yet.</p>
      )}
    </div>
  );
}