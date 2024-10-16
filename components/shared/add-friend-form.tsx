"use client";

import { addFriend } from "@/app/utils/data";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddFriendForm({ friendId }: { friendId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (friendId: string) => addFriend(friendId),
    onSuccess: () => {
      toast({
        title: "Friendship request sent",
        description: "You can now wait for the user to accept your request",
        variant: "default",
      });
      // Optionally invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: [friendId, "friend-status"] });
    },
    onError: (error: any) => {
      toast({
        title: "Well this did not work...",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(friendId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button size={"xs"} disabled={isLoading} variant={"secondary"}>
        {isLoading ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
