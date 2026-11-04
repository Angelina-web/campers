"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Stars from "@/components/Stars/Stars";
import { fetchReviews } from "@/lib/api";

type Props = {
  camperId: string;
};

export default function Reviews({ camperId }: Props) {
  const t = useTranslations("Camper");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => fetchReviews(camperId),
  });

  if (isLoading) return null;

  if (isError) {
    return <p className="w-[638px] shrink-0 text-main">{t("reviewsError")}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="w-[638px] shrink-0 text-text">{t("noReviews")}</p>;
  }

  return (
    <ul className="flex w-[638px] shrink-0 flex-col gap-6">
      {data.map((review) => (
        <li key={review.id} className="rounded-2xl bg-inputs p-4">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-background text-2xl font-semibold text-gray"
            >
              {review.reviewer_name.charAt(0).toUpperCase()}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-base font-medium leading-[150%] text-main">
                {review.reviewer_name}
              </p>
              <Stars value={review.reviewer_rating} />
            </div>
          </div>
          <p className="mt-4 text-base font-normal leading-[150%] text-text">
            {review.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}