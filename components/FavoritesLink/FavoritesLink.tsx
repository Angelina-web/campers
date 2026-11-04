"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFavorites } from "@/lib/favoritesStore";
import { useIsClient } from "@/lib/useIsClient";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default function FavoritesLink() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const isClient = useIsClient();
  const count = useFavorites((state) => state.ids.length);
  const active = pathname.startsWith("/favorites");

  return (
     <Link
      href="/favorites"
      aria-label={t("favorites")}
      className={`relative flex size-10 items-center justify-center rounded-full transition-colors hover:text-button-hover ${
        active ? "text-button" : "text-main"
      }`}
    >
      <SvgIcon src="/svg/heart.svg" width={24} height={24} />
  
      {isClient && count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-button px-1 text-xs font-medium leading-5 text-white"
        >
          {count}
        </span>
      )}
    </Link>
  );
}