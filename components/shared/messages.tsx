"use client";

import { Message, User } from "@prisma/client";
import { Input } from "../ui/input";
import { useState } from "react";
import { getMessagesBetweenUsers, sendMessage } from "@/app/utils/data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

type MessageWithSender = Message & {
  sender: User;
};

export default function Messages({
  friendId,
  user,
}: {
  friendId: string;
  user: User;
}) {
  const [message, setMessage] = useState("");
  const [liveUpdates, setLiveUpdates] = useState(false);

  const queryClient = useQueryClient();

  const { data: messages } = useQuery({
    queryKey: [friendId, "messages"],
    queryFn: () => getMessagesBetweenUsers(friendId),
    refetchInterval: liveUpdates ? 1000 : false,
  });

  const mutation = useMutation({
    mutationFn: (friendId: string) => sendMessage(friendId, message),
    onMutate: async (newMessage) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [friendId, "messages"] });

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData([friendId, "messages"]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        [friendId, "messages"],
        (old: MessageWithSender[] | undefined) => {
          const optimisticMessage: MessageWithSender = {
            id: Date.now().toString(),
            content: message,
            createdAt: new Date(),
            updatedAt: new Date(),
            senderId: "currentUserId", // Replace with actual current user ID
            friendshipId: friendId,
            sender: {
              id: user.id,
              name: user.name,
              image: user.image,
            } as User,
            groupId: "currentUserId", // Replace with actual current user ID
          };
          return [...(old || []), optimisticMessage];
        }
      );

      // Return a context object with the snapshotted value
      return { previousMessages };
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        variant: "default",
      });
      setMessage("");
    },
    onError: (err, newMessage, context) => {
      queryClient.setQueryData(
        [friendId, "messages"],
        context?.previousMessages
      );
      toast({
        title: "Well this did not work...",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [friendId, "messages"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      mutation.mutate(friendId);
    }
  };

  const groupedMessages =
    messages?.reduce((acc, message, index, array) => {
      const lastGroup = acc[acc.length - 1];
      if (
        lastGroup &&
        lastGroup[0].senderId === message.senderId &&
        (index === 0 || array[index - 1].senderId === message.senderId)
      ) {
        lastGroup.push({
          ...message,
          sender: {
            ...message.sender,
            name: message.sender.name,
            image: message.sender.image,
          },
        });
      } else {
        acc.push([message]);
      }
      return acc;
    }, [] as MessageWithSender[][]) || [];

  return (
    <div className="grid grid-rows-[1fr_auto] border border-gray-300 rounded-xl pb-4 relative">
      <div className="flex justify-end mb-4 absolute top-4 right-4">
        <Button
          variant="outline"
          size="xs"
          onClick={() => setLiveUpdates(!liveUpdates)}
        >
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              liveUpdates ? "bg-green-500 animate-pulse" : "bg-gray-300"
            }`}
          ></div>
          Live updates
        </Button>
      </div>

      <div className="overflow-auto max-h-[500px] pt-4 px-4">
        {groupedMessages.length === 0 ? (
          <div className="text-center text-gray-500 h-[300px] items-center flex justify-center">
            No messages yet
          </div>
        ) : (
          <>
            {groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <div className="flex items-start space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={group[0].sender.image || ""}
                      alt={group[0].sender.name || ""}
                    />
                    <AvatarFallback>
                      {group[0].sender.name?.slice(0, 2) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {group[0].sender.name}
                    </span>
                    {group.map(
                      (message) =>
                        message.content && (
                          <div key={message.id} className="mt-1">
                            {message.content}
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit} className="px-4">
        <Input
          value={message}
          placeholder="Type your message here..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
