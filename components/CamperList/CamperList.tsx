import { Camper } from "@/types/camper";
import css from "./CamperList.module.css";
import Link from "next/link";
import useFavoritesStore from "@/lib/store/favorites";
import Image from "next/image";
import { icons } from "@/app/constants/icons";

type Props = {
  campers: Camper[];
};

export default function CamperList({ campers = [] }: Props) {
  const { favorites, toggleFavorite } = useFavoritesStore();

  const equipmentKeys = [
    "AC",
    "bathroom",
    "kitchen",
    "TV",
    "refrigerator",
    "radio",
  ];

  const handleClick = (camperId: string) => {
    toggleFavorite(camperId);
  };

  return (
    <div>
      {campers.map((camper) => {
        const activeEquipment = equipmentKeys.filter(
          (key) => camper[key as keyof Camper]
        );
        const isFavorite = favorites.includes(camper.id);

        const booleanFeatures: { key: keyof Camper; label: string }[] = [
          { key: "AC", label: "Air Conditioning" },
          { key: "TV", label: "TV" },
          { key: "kitchen", label: "Kitchen" },
          { key: "radio", label: "Radio" },
          { key: "refrigerator", label: "Refrigerator" },
          { key: "microwave", label: "Microwave" },
          { key: "gas", label: "Gas" },
          { key: "water", label: "Water" },
        ];

        return (
          <div key={camper.id} className={css.camperCard}>
            <div className={css.camperImage}>
              <Image
                src={camper.gallery[0].thumb}
                alt={camper.name}
                width={292}
                height={320}
              />
            </div>

            <div className={css.camperContainer}>
              <div className={css.info}>
                <div className={css.mainInfo}>
                  <h2 className={css.mainTitle}>{camper.name}</h2>

                  <div className={css.infoTop}>
                    <h2>€{camper.price}</h2>

                    <button
                      className={css.fauvoriteButton}
                      onClick={() => handleClick(camper.id)}
                    >
                      <svg
                        width={24}
                        height={21}
                        className={`${css.fauvoriteIcon} ${
                          isFavorite ? css.iconActive : ""
                        }`}
                      >
                        <use href="/symbol-defs.svg#icon-fauvorite" />
                      </svg>
                    </button>
                  </div>
                </div>

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
              </div>

              <p className={css.text}>{camper.description}</p>

              <div className={css.featuresElementsCont}>
                {booleanFeatures
                  .filter((f) => camper[f.key])
                  .map((f) => (
                    <div key={f.key} className={css.featuresElements}>
                      
                      {icons[f.key] && (
                        <svg width={20} height={20} className={css.featuresIcons}>
                        <use href={`/symbol-defs.svg#${icons[f.key]}`} />
                      </svg>
                      )}
                      <p className={css.featuresLabel}>{f.label}</p>
                    </div>
                  ))}
              </div>

              <Link href={`/catalog/${camper.id}`} className={css.viewButton}>
                Show More
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
