"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormatter, useTranslations } from "next-intl";
import Badge from "@/components/Badge/Badge";
import Rating from "@/components/Rating/Rating";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import type { Camper } from "@/types/camper";
import HeartButton from "@/components/HeartButton/HeartButton";

type Props = {
  camper: Camper;
};

export default function CamperCard({ camper }: Props) {
  const t = useTranslations("Catalog");
  const tOptions = useTranslations("Options");
  const format = useFormatter();

  const price = format.number(camper.price, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    useGrouping: false,
  });

  return (
    <article className="flex min-h-[312px] w-full max-w-[888px] gap-6 rounded-2xl bg-inputs p-6">
      <Image
        src={camper.coverImage}
        alt={camper.name}
        width={219}
        height={240}
        className="h-[240px] w-[219px] shrink-0 rounded-[10px] object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold leading-[133%] text-main">
            {camper.name}
          </h2>
          <div className="flex shrink-0 items-center gap-3">
  <p className="text-2xl font-semibold leading-[133%] text-main">{price}</p>
  <HeartButton camperId={camper.id} />
</div>
        </div>

        <div className="mt-2 flex items-center gap-4 text-base font-normal leading-[150%] text-main">
          <Rating rating={camper.rating} reviews={camper.totalReviews} />
          <span className="inline-flex items-center gap-1">
            <SvgIcon src="/svg/map.svg" width={16} height={16} />
            {camper.location}
          </span>
        </div>

        <p className="mt-6 overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal leading-[150%] text-text">
          {camper.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge icon={<SvgIcon src="/svg/petrol.svg" width={20} height={20} />}>
            {tOptions(`engine.${camper.engine}`)}
          </Badge>
          <Badge icon={<SvgIcon src="/svg/automatic.svg" width={20} height={20} />}>
            {tOptions(`transmission.${camper.transmission}`)}
          </Badge>
          <Badge icon={<SvgIcon src="/svg/alcove.svg" width={20} height={20} />}>
            {tOptions(`form.${camper.form}`)}
          </Badge>
        </div>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-[173px] h-14  items-center justify-center rounded-full bg-button px-11 py-4 text-white font-medium leading-[150%] tracking-[-0.01em] text-on-button transition-colors hover:bg-button-hover"
        >
          {t("showMore")}
        </Link>
      </div>
    </article>
  );
}