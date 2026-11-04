"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const change = (code: Locale) => {
    if (code === locale) return;
    startTransition(async () => {
      await setLocale(code);
      router.refresh();
    });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center gap-1"
    >
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          disabled={isPending}
          aria-pressed={locale === code}
          onClick={() => change(code)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            locale === code
              ? "bg-button text-white"
              : "text-main hover:text-button-hover"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
