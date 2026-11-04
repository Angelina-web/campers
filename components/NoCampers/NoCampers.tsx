"use client";

import { useTranslations } from "next-intl";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Image from "next/image";

type Props = {
  onResetAction: () => void;
};

export default function NoCampers({ onResetAction }: Props) {
  const t = useTranslations("Empty");

  return (
    <div className="flex min-h-[810px] flex-col items-center justify-center gap-10 rounded-[20px] bg-inputs p-4 text-center">
     <Image
  src="/images/no-found.webp"
  alt=""
  width={488}
  height={463}
  className="w-[488px]"
/>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-[133%] text-main">{t("title")}</h2>
        <p className="max-w-[420px] text-base font-normal leading-[150%] text-text">
          {t("text")}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onResetAction}
          className="flex h-14 items-center justify-center gap-2 rounded-full border border-button bg-background px-8 text-base font-medium leading-[150%] tracking-[-0.01em] text-main transition-colors hover:border-button-hover"
        >
          <SvgIcon src="/svg/close.svg" width={24} height={24} />
          {t("clear")}
        </button>
        <button
          type="button"
          onClick={onResetAction}
          className="h-14 rounded-full bg-button px-8 text-base font-medium leading-[150%] tracking-[-0.01em] text-white transition-colors hover:bg-button-hover"
        >
          {t("viewAll")}
        </button>
      </div>
    </div>
  );
}