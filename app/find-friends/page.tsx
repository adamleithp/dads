import PotentialFriends from "@/components/shared/potential-friends";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPotentialFriends } from "../utils/data";

export default async function FindFriends() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["potential-friends"],
    queryFn: getPotentialFriends,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PotentialFriends />
    </HydrationBoundary>
  );
}
