"use client";

import { getFriendStatus } from "@/app/utils/data";
import { useQuery } from "@tanstack/react-query";
import RemoveFriendForm from "./remove-friend-form";
import AddFriendForm from "./add-friend-form";
import { H1 } from "../ui/typography";
import { P } from "../ui/typography";
import { Friendship, User } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function FriendPageTitle({ friendUser }: { friendUser: User }) {
  const {
    data: friendStatus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [friendUser.id, "friend-status"],
    queryFn: () => getFriendStatus(friendUser.id),
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="grid grid-cols-2">
          <Avatar>
            <AvatarImage
              src={friendUser.image || ""}
              alt={friendUser.name || ""}
              className="w-10 h-10"
            />
            <AvatarFallback>{friendUser.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-0">
            <P>
              {friendStatus?.status === "ACCEPTED"
                ? "Friend"
                : friendStatus?.status === "PENDING"
                ? "Friend request sent"
                : "Not friends"}
            </P>
            <H1>{friendUser.name}</H1>
          </div>
        </div>
        {friendStatus?.status === "ACCEPTED" ? (
          <RemoveFriendForm
            friendId={friendUser.id}
            status={friendStatus.status}
          />
        ) : friendStatus?.status === "PENDING" ? (
          <RemoveFriendForm
            friendId={friendUser.id}
            status={friendStatus.status}
          />
        ) : (
          <AddFriendForm friendId={friendUser.id} />
        )}
      </div>
    </>
  );
}

export function FriendPageTitleSkeleton() {
  return (
    <div className="flex justify-between">
      <div className="space-y-0">
        <Skeleton>
          <P>Friend</P>
        </Skeleton>
        <Skeleton>
          <H1>Some name</H1>
        </Skeleton>
      </div>
      <Skeleton>
        <Button size={"xs"} variant={"secondary"}>
          Loading...
        </Button>
      </Skeleton>
    </div>
  );
}
