"use client";

import { addFriend, removeFriend } from "@/app/utils/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RemoveFriendForm({
  userId,
  status,
}: {
  userId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userId: string) => removeFriend(userId),
    onSuccess: () => {
      toast({
        title: "Friendship request removed",
        description: "You can now add them again",
        variant: "default",
      });
      // Optionally invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: [userId, "friend-status"] });
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
    mutation.mutate(userId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button size={"sm"} disabled={isLoading}>
        {isLoading
          ? "Removing..."
          : status === "PENDING"
          ? "Cancel request"
          : "Remove friend"}
      </Button>
    </form>
  );
}
