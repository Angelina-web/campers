import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
   const t = useTranslations("Hero");
  return (
    <section className="relative min-h-[calc(100vh-72px)]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      
     <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] items-center px-16">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-5xl font-semibold leading-[67%] text-white">
            {t("title")}
          </h1>
          <p className="text-2xl font-semibold leading-[133%] text-white">
            {t("subtitle")}
          </p>
          <Link
            href="/catalog"
            className="mt-8 inline-flex h-14 w-[173px] items-center justify-center rounded-full bg-button text-base font-medium leading-[150%] tracking-[-0.01em] text-white transition-colors hover:bg-button-hover"
          >
           {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
