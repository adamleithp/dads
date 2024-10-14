"use client";

import { addFriend } from "@/app/utils/data";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function AddFriendForm({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await addFriend(userId);

        if ("error" in result) {
          toast({
            title: "Well this did not work...",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Friendship request sent",
            description: "You can now wait for the user to accept your request",
            variant: "default",
          });
        }
        setIsLoading(false);
      }}
    >
      <Button size={"sm"} disabled={isLoading}>
        {isLoading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
