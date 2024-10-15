// app/posts/posts.jsx
"use client";

import { getPotentialFriends, getUserFriends } from "@/app/utils/data";
import { useQuery } from "@tanstack/react-query";
import FriendCard from "./friend-card";
import { H1, H2 } from "../ui/typography";

export default function PotentialFriends() {
  const {
    data: potentialFriends,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["potential-friends"],
    queryFn: () => getPotentialFriends(),
  });

  console.log("RQ potential friends", potentialFriends);

  return (
    <div className="space-y-10">
      <H1>Find Friends</H1>
      {potentialFriends && potentialFriends.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {potentialFriends?.map((user) => (
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

  // ...
}
