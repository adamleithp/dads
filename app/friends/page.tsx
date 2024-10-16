import MyFriends from "@/components/shared/my-friends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserFriends } from "../utils/data";

export default async function Friends() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-friends"],
    queryFn: getUserFriends,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyFriends />
    </HydrationBoundary>
  );
}
