// app/posts/posts.jsx
"use client";

import { getUserFriends } from "@/app/utils/data";
import { useQuery } from "@tanstack/react-query";
import FriendCard, { FriendCardSkeleton } from "./friend-card";
import { H1, H2 } from "../ui/typography";
import Link from "next/link";

export default function MyFriends() {
  const {
    data: myFriends,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-friends"],
    queryFn: () => getUserFriends(),
  });

  return (
    <div className="space-y-10">
      <H1>My Friends</H1>

      {isLoading ? (
        <ul className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <FriendCardSkeleton />
            </li>
          ))}
        </ul>
      ) : (
        <>
          {myFriends && myFriends.length > 0 ? (
            <ul className="grid grid-cols-3 gap-4">
              {myFriends?.map((user) => (
                <li key={user.id}>
                  <Link href={`/friend/${user.id}`}>
                    <FriendCard user={user} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>You don't have any friends yet.</p>
          )}
        </>
      )}
    </div>
  );

  // ...
}
