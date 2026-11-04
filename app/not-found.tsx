import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] flex-col items-center justify-center gap-6 px-16 text-center">
      <p className="text-[160px] font-semibold leading-none text-button">404</p>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold leading-[133%] text-main">{t("title")}</h1>
        <p className="max-w-[460px] text-base font-normal leading-[150%] text-text">
          {t("text")}
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/catalog"
          className="flex h-14 items-center justify-center rounded-full border border-button bg-background px-8 text-base font-medium leading-[150%] tracking-[-0.01em] text-main transition-colors hover:border-button-hover"
        >
          {t("catalog")}
        </Link>
        <Link
          href="/"
          className="flex h-14 items-center justify-center rounded-full bg-button px-8 text-base font-medium leading-[150%] tracking-[-0.01em] text-white transition-colors hover:bg-button-hover"
        >
          {t("home")}
        </Link>
      </div>
    </section>
  );
}