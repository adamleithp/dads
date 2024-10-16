import {
  getFriendStatus,
  getMessagesBetweenUsers,
  getUserById,
} from "@/app/utils/data";
import FriendPageTitle, {
  FriendPageTitleSkeleton,
} from "@/components/shared/friend-settings";
import Messages from "@/components/shared/messages";
import { getMeUser } from "@/lib/user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function FriendPage({
  params,
}: {
  params: { friend_id: string };
}) {
  const meUser = await getMeUser();
  const friend = await getUserById(params.friend_id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [params.friend_id, "messages"],
    queryFn: () => getMessagesBetweenUsers(params.friend_id),
  });

  await queryClient.prefetchQuery({
    queryKey: [params.friend_id, "friend-status"],
    queryFn: () => getFriendStatus(params.friend_id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-10">
        {!friend ? (
          <FriendPageTitleSkeleton />
        ) : (
          <FriendPageTitle friendUser={friend} />
        )}
        <div className="space-y-10">
          {meUser && <Messages friendId={params.friend_id} user={meUser} />}
        </div>
      </div>
    </HydrationBoundary>
  );
}
