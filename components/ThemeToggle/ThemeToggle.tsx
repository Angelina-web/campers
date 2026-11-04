"use client";

import { useTranslations } from "next-intl";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default function ThemeToggle() {
  const t = useTranslations("Header");

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggleTheme")}
      className="flex size-10 items-center justify-center rounded-full text-main hover:text-button-hover"
    >
      {/* у світлій темі показуємо місяць, у темній сонце */}
      <span className="dark:hidden">
        <SvgIcon src="/svg/moon.svg" width={21} height={21} />
      </span>
      <span className="hidden dark:block">
        <SvgIcon src="/svg/sun.svg" width={28} height={28} />
      </span>
    </button>
  );
}