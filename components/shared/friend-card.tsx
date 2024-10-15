"use client";

import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getMeUser } from "@/lib/user";
import prisma from "@/app/utils/prisma";
import AddFriendForm from "./add-friend-form";
import RemoveFriendForm from "./remove-friend-form";
import { useQuery } from "@tanstack/react-query";
import { getFriendStatus, getPotentialFriends } from "@/app/utils/data";

export default function FriendCard({ user }: { user: User }) {
  const {
    data: friendStatus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [user.id, "friend-status"],
    queryFn: () => getFriendStatus(user.id),
  });

  console.log("friendStatus", friendStatus);

  return (
    <div className="space-y-2 border border-gray-700 rounded p-4">
      <div className="flex gap-2 justify-between">
        <Avatar>
          <AvatarImage src={user.image || ""} alt={user.name || ""} />
          <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>

        {friendStatus?.status === "ACCEPTED" ? (
          <RemoveFriendForm userId={user.id} status={friendStatus.status} />
        ) : friendStatus?.status === "PENDING" ? (
          <RemoveFriendForm userId={user.id} status={friendStatus.status} />
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
