import { Camper } from "@/types/camper";
import { icons } from "@/app/constants/icons";
import css from "./Features.module.css";

type FeaturesProps = {
  camper: Camper;
  activeTab: "features" | "reviews";
};

export default function Features({ camper, activeTab }: FeaturesProps) {
  if (activeTab !== "features") return null;

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

  const vehicleDetails = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div className={css.featuresContainer}>
      <div className={css.featuresElementsCont}>
        {booleanFeatures
          .filter((f) => camper[f.key])
          .map((f) => (
            <div key={f.key} className={css.featuresElements}>
              <svg width={20} height={20} className={css.featuresIcons}>
                <use href={`/symbol-defs.svg#${icons[f.key]}`} />
              </svg>
              <p className={css.featuresLabel}>{f.label}</p>
            </div>
          ))}
      </div>

      <div className={css.featuresDetails}>
        <h3 className={css.featuresTitle}>Vehicle Details</h3>
        <div className={css.line}></div>
        <div className={css.detailsElements}>
          {vehicleDetails.map((item) => (
            <div key={item.label} className={css.vehicleDetails}>
              <p className={css.vehicleText}>{item.label}</p>
              <p className={css.vehicleText}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
