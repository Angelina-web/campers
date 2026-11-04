"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
import { fetchCamper } from "@/lib/api";
import { useFavorites } from "@/lib/favoritesStore";
import { useIsClient } from "@/lib/useIsClient";
import type { Camper, CamperDetails } from "@/types/camper";

// деталі -> формат картки: перше фото галереї стає обкладинкою
function toCard(details: CamperDetails): Camper {
  const { gallery, ...rest } = details;
  const first = [...gallery].sort((a, b) => a.order - b.order)[0];
  return { ...rest, coverImage: first?.original ?? "/images/no-found.webp" };
}

export default function FavoritesView() {
  const t = useTranslations("FavoritesPage");
  const isClient = useIsClient();
  const ids = useFavorites((state) => state.ids);

  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["camper", id],
      queryFn: () => fetchCamper(id),
      staleTime: 60_000,
    })),
  });

  if (!isClient) return null;

  const isLoading = queries.some((q) => q.isLoading);

 const campers = queries
  .map((q) => q.data)
  .filter((c): c is CamperDetails => !!c)
  .map(toCard);

  return (
    <div className="mx-auto max-w-[1440px] px-16 py-12">
      <h1 className="text-2xl font-semibold leading-[133%] text-main">
  {t("title")}
</h1>

      {isLoading && <Loader />}

      {!isLoading && campers.length === 0 && (
        <div className="mt-4 flex min-h-[400px] flex-col items-center justify-center gap-2 rounded-[20px] bg-inputs p-10 text-center">
          <h2 className="text-2xl font-semibold leading-[133%] text-main">
            {t("emptyTitle")}
          </h2>
          <p className="max-w-[420px] text-base font-normal leading-[150%] text-text">
            {t("emptyText")}
          </p>
          <Link
            href="/catalog"
            className="mt-2 flex h-14 items-center justify-center rounded-full bg-button px-8 text-base font-medium leading-[150%] tracking-[-0.01em] text-white transition-colors hover:bg-button-hover"
          >
            {t("browse")}
          </Link>
        </div>
      )}

      <ul className="mt-8 flex flex-col gap-2">
        {campers.map((camper) => (
          <li key={camper.id}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>
    </div>
  );
}