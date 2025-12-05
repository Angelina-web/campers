"use client";

import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BookingForm from "@/components/Form/Form";
import { getCamperById } from "@/lib/api";
import { Camper } from "@/types/camper";
import Reviews from "@/components/Reviews/Reviews";
import Features from "@/components/Features/Features";

type Props = {
  id: string;
};

export default function CamperDetailsClient({ id }: Props) {
  const [activeTab, setActiveTab] = useState<"features" | "reviews">("features");

  const { data: camper, isLoading, error } = useQuery<Camper>({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !camper) return <p>Some error...</p>;

  return (
    <main>
      <div className="container">

        {/* Header */}
        <div>
          <h2>{camper.name}</h2>

          <div>
            <svg><use href="/icons.svg#icon-star" /></svg>
            <p>{camper.rating}</p>

            <p>
              ({camper.reviews.length}{" "}
              {camper.reviews.length === 1 ? "review" : "reviews"})
            </p>

            <div>
              <svg><use href="/icons.svg#icon-map" /></svg>
              <p>{camper.location}</p>
            </div>
          </div>

          <p>€{camper.price}</p>
        </div>

        {/* Gallery */}
        <div>
          {camper.gallery.map((img, index) => (
            <Image
              key={index}
              width={292}
              height={312}
              src={img.thumb || "/placeholder.jpg"}
              alt={`${camper.name} image ${index}`}
            />
          ))}
        </div>

        {/* Description */}
        <p>{camper.description}</p>

        {/* Tabs */}
        <div>
          <button onClick={() => setActiveTab("features")}>Features</button>
          <button onClick={() => setActiveTab("reviews")}>Reviews</button>
        </div>

        {/* Main Content */}
        <div className="tabs-container">

          {/* FEATURES */}
          {activeTab === "features" && (
            <Features camper={camper} activeTab={activeTab} />
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <Reviews camper={camper} />
          )}

          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
