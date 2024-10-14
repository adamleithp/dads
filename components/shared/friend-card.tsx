import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getMeUser } from "@/lib/user";
import prisma from "@/app/utils/prisma";
import AddFriendForm from "./add-friend-form";
import RemoveFriendForm from "./remove-friend-form";

export default async function FriendCard({ user }: { user: User }) {
  const meUser = await getMeUser();
  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [
        { user1Id: meUser?.id, user2Id: user.id },
        { user1Id: user.id, user2Id: meUser?.id },
      ],
    },
    include: {
      user1: true,
      user2: true,
    },
  });

  console.log("------ friendships", friendships);

  const friend = friendships.find(
    (friendship) =>
      friendship.user1Id === meUser?.id && friendship.user2Id === user.id
  );

  return (
    <div className="space-y-2 border border-gray-700 rounded p-4">
      <div className="flex gap-2 justify-between">
        <Avatar>
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>

        {friend ? (
          <RemoveFriendForm userId={user.id} />
        ) : (
          <AddFriendForm userId={user.id} />
        )}
      </div>
      <div>{user.name}</div>
      <div className="flex gap-2">
        <Badge>Soccer</Badge>
      </div>
    </div>
  );
}

export const revalidate = 36;
export const revalidateTag = "friends";
