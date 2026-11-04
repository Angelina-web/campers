"use client";

import { useTranslations } from "next-intl";
import { useFavorites } from "@/lib/favoritesStore";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

type Props = {
  camperId: string;
};

export default function HeartButton({ camperId }: Props) {
  const t = useTranslations("Favorites");
  const isFavorite = useFavorites((state) => state.ids.includes(camperId));
  const toggle = useFavorites((state) => state.toggle);

  return (
    <button
      type="button"
      onClick={() => toggle(camperId)}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? t("remove") : t("add")}
      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-120 motion-reduce:transform-none ${
        isFavorite ? "text-red-500" : "text-main"
      }`}
    >
      <SvgIcon src="/svg/heart.svg" width={24} height={24} />
    </button>
  );
}