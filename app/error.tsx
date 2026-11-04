"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] flex-col items-center justify-center gap-6 px-16 text-center">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-20 text-button"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold leading-[133%] text-main">{t("title")}</h1>
        <p className="max-w-[460px] text-base font-normal leading-[150%] text-text">
          {t("text")}
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/"
          className="flex h-14 items-center justify-center rounded-full border border-gray-light bg-background px-8 text-base font-medium leading-[150%] tracking-[-0.01em] text-main transition-colors hover:border-button"
        >
          {t("home")}
        </Link>
        <button
          type="button"
          onClick={reset}
          className="h-14 rounded-full bg-button px-8 text-base font-medium leading-[150%] tracking-[-0.01em] text-white transition-colors hover:bg-button-hover"
        >
          {t("retry")}
        </button>
      </div>
    </section>
  );
}