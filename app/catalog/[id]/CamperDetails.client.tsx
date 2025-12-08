"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BookingForm from "@/components/Form/Form";
import { getCamperById } from "@/lib/api/api";
import { Camper } from "@/types/camper";
import Reviews from "@/components/Reviews/Reviews";
import Features from "@/components/Features/Features";
import css from "./CamperDetails.module.css";

type Props = {
  id: string;
};

export default function CamperDetailsClient({ id }: Props) {
  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features"
  );

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery<Camper>({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !camper) return <p>Some error...</p>;

  return (
    <main>
      <div className="container">
        <div className={css.elementInfoContainer}>
          <h2 className={css.elementName}>{camper.name}</h2>

          <div className={css.elementRating}>
            <svg className={css.star}>
              <use href="/symbol-defs.svg#icon-star" />
            </svg>
            <p className={css.elementText}>{camper.rating}</p>

            <p className={css.elementText}>
              ({camper.reviews.length}{" "}
              {camper.reviews.length === 1 ? "review" : "reviews"})
            </p>

            <div className={css.elementMap}>
              <svg className={css.elementIcon}>
                <use href="/symbol-defs.svg#icon-map" />
              </svg>
              <p className={css.elementText}>{camper.location}</p>
            </div>
          </div>

          <p className={css.elementPrice}>€{camper.price}</p>
        </div>

        <div className={css.gallery}>
          {camper.gallery.map((img, index) => (
            <Image
              key={index}
              width={292}
              height={312}
              loading="lazy"
              src={img.thumb || "/placeholder.jpg"}
              alt={`${camper.name} image ${index}`}
              className={css.image}
            />
          ))}
        </div>

        <p className={css.description}>{camper.description}</p>

        <div className={css.tabs}>
          <button
            onClick={() => setActiveTab("features")}
            className={
              activeTab === "features" ? css.activeTab : css.notActiveTab
            }
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={
              activeTab === "reviews" ? css.activeTab : css.notActiveTab
            }
          >
            Reviews
          </button>
        </div>
        <div className={css.line}></div>

        <div className={css.tabsContainer}>
          {activeTab === "features" && (
            <Features camper={camper} activeTab={activeTab} />
          )}

          {activeTab === "reviews" && <Reviews camper={camper} />}

          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
