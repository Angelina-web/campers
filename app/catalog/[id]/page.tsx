"use client";

import { getCamperById } from "@/lib/api";
import { Camper } from "@/types/camper";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookingForm from "@/components/Form/Form";

export default function CamperDetails() {
  const { id } = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features"
  );

  useEffect(() => {
    if (!id) return;

    const fetchCamper = async () => {
      try {
        const data = await getCamperById(id as string);
        setCamper(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!camper) return <p>Not found</p>;

  const booleanFeatures = [
    { key: "AC", label: "Air Conditioning" },
    { key: "TV", label: "TV" },
    { key: "kitchen", label: "Kitchen" },
    { key: "radio", label: "Radio" },
    { key: "refrigerator", label: "Refrigerator" },
    { key: "microwave", label: "Microwave" },
    { key: "gas", label: "Gas" },
    { key: "water", label: "Water" },
  ] as const;

  const vehicleDetails = {
    Form: camper.form,
    Length: camper.length,
    Width: camper.width,
    Height: camper.height,
    Tank: camper.tank,
    Engine: camper.engine,
    Transmission: camper.transmission,
    Consumption: camper.consumption,
  };

  return (
    <main>
      <div className="container">
        <div>
          <h2>{camper.name}</h2>

          <div>
            <svg>
              <use href="/icons.svg#icon-star" />
            </svg>
            <p>{camper.rating}</p>

            <p>
              ({camper.reviews.length}{" "}
              {camper.reviews.length === 1 ? "review" : "reviews"})
            </p>

            <div>
              <svg>
                <use href="/icons.svg#icon-map" />
              </svg>
              <p>{camper.location}</p>
            </div>
          </div>

          <p>€{camper.price.toFixed(2)}</p>
        </div>

        <div>
          {camper.gallery.map((img, index) => (
            <Image
              key={index}
              width={292}
              height={312}
              src={img.thumb || "/placeholder.jpg"}
              alt={`${camper.name} ${index}`}
            />
          ))}
        </div>

        <p>{camper.description}</p>

        <div>
          <button onClick={() => setActiveTab("features")}>Features</button>
          <button onClick={() => setActiveTab("reviews")}>Reviews</button>
        </div>
        <div>
          <div>
            {activeTab === "features" && (
              <div>
                <h3>Features</h3>

                {booleanFeatures
                  .filter((f) => camper[f.key])
                  .map((f) => (
                    <div key={f.key}>
                      <span>{f.label}</span>
                    </div>
                  ))}

                <h3>Vehicle details</h3>
                <div>
                  {Object.entries(vehicleDetails).map(([key, value]) => (
                    <div key={key}>
                      <span>{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {camper.reviews.map((review) => (
                  <div key={review.reviewer_name}>
                    <div>
                      <div>{review.reviewer_name[0]}</div>

                      <div>
                        <p>{review.reviewer_name}</p>

                        <div>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i}>
                              <use href="/icons.svg#icon-star" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
