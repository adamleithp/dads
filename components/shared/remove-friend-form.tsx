"use client";

import { addFriend, removeFriend } from "@/app/utils/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";

export default function RemoveFriendForm({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await removeFriend(userId);

        if ("error" in result) {
          toast({
            title: "Well this did not work...",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Friendship request removed",
            description: "You can now add them again",
            variant: "default",
          });
        }
        setIsLoading(false);
      }}
    >
      <Button size={"sm"} disabled={isLoading}>
        {isLoading ? "Removing..." : "Cancel request"}
      </Button>
    </form>
  );
}
