"use client";

import { addFriend, removeFriend } from "@/app/utils/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RemoveFriendForm({
  friendId,
  status,
}: {
  friendId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (friendId: string) => removeFriend(friendId),
    onSuccess: () => {
      toast({
        title: "Friendship request removed",
        description: "You can now add them again",
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
        {isLoading
          ? "Removing..."
          : status === "PENDING"
          ? "Cancel request"
          : "Remove friend"}
      </Button>
    </form>
  );
}
