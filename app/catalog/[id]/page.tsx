import { getCamperById } from "@/lib/api/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CamperDetailsClient from "./CamperDetails.client";

type Props = {
  params: { id: string };
};

export default async function CamperDetails({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient id={id} />
    </HydrationBoundary>
  );
}
