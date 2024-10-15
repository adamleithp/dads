import prisma from "@/app/utils/prisma";
import { getMeUser } from "@/lib/user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserFriends } from "../utils/data";
import MyFriends from "@/components/shared/my-friends";

export default async function Friends() {
  // const user = await getMeUser();

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
