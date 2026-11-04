"use client";

import { isAxiosError } from "axios";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useFormatter, useTranslations } from "next-intl";
import Badge from "@/components/Badge/Badge";
import BookingForm from "@/components/BookingForm/BookingForm";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import Loader from "@/components/Loader/Loader";
import Rating from "@/components/Rating/Rating";
import Reviews from "@/components/Reviews/Reviews";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { fetchCamper } from "@/lib/api";
import HeartButton from "@/components/HeartButton/HeartButton";

type Props = {
  camperId: string;
};

export default function CamperDetails({ camperId }: Props) {
  const t = useTranslations("Camper");
  const tOptions = useTranslations("Options");
  const format = useFormatter();

  const { data: camper, isLoading, error } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => fetchCamper(camperId),
    retry: false,
  });

  if (isAxiosError(error) && error.response?.status === 404) notFound();

  if (isLoading) return <Loader />;

  if (error || !camper) {
    return (
      <p className="mx-auto max-w-[1440px] px-16 py-12 text-main">
        {t("loadError")}
      </p>
    );
  }

  const price = format.number(camper.price, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    useGrouping: false,
  });

  const gallery = [...camper.gallery].sort((a, b) => a.order - b.order);

  const specs = [
    { label: t("form"), value: tOptions(`form.${camper.form}`) },
    { label: t("length"), value: camper.length },
    { label: t("width"), value: camper.width },
    { label: t("height"), value: camper.height },
    { label: t("tank"), value: camper.tank },
    { label: t("consumption"), value: camper.consumption },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-16 py-12">
      <div className="flex items-start gap-6">
        <CamperGallery images={gallery} name={camper.name} />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <section className="rounded-2xl bg-inputs p-6">
            <h1 className="text-2xl font-semibold leading-[133%] text-main">
              {camper.name}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-base font-normal leading-[150%] text-main">
              <Rating rating={camper.rating} reviews={camper.totalReviews} />
              <span className="inline-flex items-center gap-1">
                <SvgIcon src="/svg/map.svg" width={16} height={16} />
                {camper.location}
              </span>
            </div>
           <div className="mt-4 flex items-center gap-3">
  <p className="text-2xl font-semibold leading-[133%] text-main">{price}</p>
  <HeartButton camperId={camper.id} />
</div>
            <p className="mt-4 text-base font-normal leading-[150%] text-text">
              {camper.description}
            </p>
          </section>

          <section className="rounded-2xl bg-inputs p-6">
            <h2 className="text-xl font-semibold leading-[120%] text-main">
              {t("vehicleDetails")}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{tOptions(`transmission.${camper.transmission}`)}</Badge>
              <Badge>{tOptions(`engine.${camper.engine}`)}</Badge>
              <Badge>{tOptions(`form.${camper.form}`)}</Badge>
              {camper.amenities.map((amenity) => (
                <Badge key={amenity}>{tOptions(`amenity.${amenity}`)}</Badge>
              ))}
            </div>

            <dl className="mt-6 flex flex-col gap-2 border-t border-gray-light pt-4">
              {specs.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between gap-2 text-base font-normal leading-[150%] text-mail"
                >
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold leading-[120%] text-main">
          {t("reviews")}
        </h2>
        <div className="mt-6 flex items-start gap-6">
          <Reviews camperId={camperId} />
          <BookingForm camperId={camperId} />
        </div>
      </section>
    </div>
  );
}