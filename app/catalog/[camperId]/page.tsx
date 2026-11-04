import CamperDetails from "@/components/CamperDetails/CamperDetails";

type Props = {
  params: Promise<{ camperId: string }>;
};

export default async function CamperPage({ params }: Props) {
  const { camperId } = await params;

  return <CamperDetails camperId={camperId} />;
}