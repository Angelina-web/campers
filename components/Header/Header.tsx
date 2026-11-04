"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import FavoritesLink from "@/components/FavoritesLink/FavoritesLink";

const links = [
  { href: "/", key: "home" },
  { href: "/catalog", key: "catalog" },
] as const;

export default function Header() {
  const pathname = usePathname();
   const t = useTranslations("Header");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 h-18 bg-inputs">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-around px-16">
         <Link href="/" aria-label={t("homeLink")} className="justify-self-start">
          <SvgIcon src="/svg/logo.svg" width={136} height={16} />
        </Link>

        <nav aria-label={t("mainNav")}>
          <ul className="flex items-center gap-8 ">
            {links.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-base font-medium transition-colors hover:text-button-hover ${
                    isActive(href) ? "text-button" : "text-main"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          <FavoritesLink />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
