import prisma from "@/app/utils/prisma";
import FriendCard from "@/components/shared/friend-card";
import { getMeUser } from "@/lib/user";

export default async function FindFriends() {
    const user = await getMeUser();

const users = await prisma.user.findMany({
    where: {
      id: {
        not: user?.id
      }
    },
  });

  return (
    <div>
      <h1>Find Friends</h1>
      {users.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <li key={user.id}>
              <FriendCard user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <p>You don't have any friends yet.</p>
      )}
    </div>
  );
}