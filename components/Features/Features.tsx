import { Camper } from "@/types/camper";
import { icons } from "@/app/constants/icons";

type FeaturesProps = {
  camper: Camper;
  activeTab: "features" | "reviews";
};

export default function Features({ camper, activeTab }: FeaturesProps) {
  if (activeTab !== "features") return null;

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

  const vehicleDetails = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Engine", value: camper.engine },
    { label: "Transmission", value: camper.transmission },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div>
      <h3>Features</h3>

      {booleanFeatures
        .filter(f => camper[f.key])
        .map(f => (
          <div key={f.key}>
            <svg width={20} height={20}>
              <use href={`/icons.svg#${icons[f.key]}`} />
            </svg>
            <span>{f.label}</span>
          </div>
        ))}

      <h3>Vehicle Details</h3>

      <div>
        {vehicleDetails.map(item => (
          <div key={item.label}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
