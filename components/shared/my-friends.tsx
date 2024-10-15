// app/posts/posts.jsx
"use client";

import { getUserFriends } from "@/app/utils/data";
import { useQuery } from "@tanstack/react-query";
import FriendCard from "./friend-card";
import { H1, H2 } from "../ui/typography";

export default function MyFriends() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const {
    data: myFriends,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-friends"],
    queryFn: () => getUserFriends(),
  });

  console.log("RQ my friends", myFriends);

  return (
    <div className="space-y-10">
      <H1>My Friends</H1>
      {myFriends && myFriends.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {myFriends?.map((user) => (
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
