"use client";

import { useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import CamperCard from "@/components/CamperCard/CamperCard";
import FiltersPanel from "@/components/FiltersPanel/FiltersPanel";
import Loader from "@/components/Loader/Loader";
import NoCampers from "@/components/NoCampers/NoCampers";
import { fetchCampers } from "@/lib/api";
import type { CampersFilters } from "@/types/camper";

const PER_PAGE = 4;

export default function CatalogView() {
  const t = useTranslations("Catalog");
  const [filters, setFilters] = useState<CampersFilters>({});
  const [resetKey, setResetKey] = useState(0);

  const {
    data,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      fetchCampers({ ...filters, page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
     placeholderData: keepPreviousData,
  });

  const allCampers = data?.pages.flatMap((page) => page.campers) ?? [];

const campers = allCampers.filter(
  (camper, index) =>
    allCampers.findIndex((item) => item.id === camper.id) === index
);

const showLoader = isFetching && !isFetchingNextPage;

  const handleReset = () => {
    setFilters({});
    setResetKey((k) => k + 1);
  };

  return (
    <div className="mx-auto flex max-w-[1440px] items-start gap-[65px] px-16 py-12">
      <FiltersPanel  key={resetKey} onSearchAction={setFilters} />

      <section className="flex min-w-0 flex-1 flex-col gap-8">
        {isError && <p className="text-main">{t("error")}</p>}
         {!showLoader && !isError && campers.length === 0 && (
          <NoCampers onResetAction={handleReset} />
        )}

        <ul className="flex flex-col gap-8">
          {campers.map((camper) => (
            <li key={camper.id}>
              <CamperCard camper={camper} />
            </li>
          ))}
        </ul>

        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="self-center rounded-full border border-gray-light px-8 py-4 text-base font-medium leading-[150%] tracking-[-0.01em] text-main transition-colors hover:border-button disabled:opacity-50"
          >
            {isFetchingNextPage ? t("loading") : t("loadMore")}
          </button>
        )}
      </section>
       {showLoader && <Loader />}
    </div>
  );
}