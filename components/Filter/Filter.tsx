"use client";

import css from "./Filter.module.css";
import { useState } from "react";
import { useCampersStore } from "@/lib/store/useCampersStore";
import { CamperForm } from "@/types/filters";
import { icons } from "@/app/constants/icons";

export default function Filters() {
  const { filters, setFilters } = useCampersStore();
  const [location, setLocation] = useState(filters.location || "");
  const [form, setForm] = useState<CamperForm | "">(filters.form || "");
  const [equipment, setEquipment] = useState<
    ("AC" | "kitchen" | "TV" | "bathroom")[]
  >(filters.equipment || []);
  const [transmission, setTransmission] = useState<"" | "automatic">(
    filters.transmission === "automatic" ? "automatic" : ""
  );

  const handleApply = () => {
    setFilters({
      location: location || undefined,
      form: form || undefined,
      equipment: equipment.length ? equipment : undefined,
      transmission: transmission || undefined,
    });
  };

  const toggleEquipment = (key: "AC" | "kitchen" | "TV" | "bathroom") => {
    if (equipment.includes(key)) {
      setEquipment(equipment.filter((e) => e !== key));
    } else {
      setEquipment([...equipment, key]);
    }
  };

 
  return (
    <div className={css.filterContainer}>
      <div className={css.locationFilter}>
        <label className={css.locationText}>
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={css.input}
          placeholder="City"
        />
        <svg className={css.elementIcon}>
                <use href="/icons.svg#icon-map" />
              </svg>
      </div>

     
      <div className={css.filterSection}>
        <p className={css.filterText}>
          Filters
        </p>

        <p className={css.filterTitle}>
          Vehicle equipment
        </p>
              <div className={css.line}></div>
              
        <div className={css.equipmentContainer}>
          {(["AC", "kitchen", "TV", "bathroom"] as const).map((key) => {
            const isActive = equipment.includes(key);
            return (
              <label key={key} className={css.filterElements}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => toggleEquipment(key)}
                />
                <div className={isActive ? css.filterElementBoxActive : css.filterElementBox}>
                  {icons[key] && (
                    <svg className={css.filterElementIcon}>
                      <use href={`/icons.svg#${icons[key]}`} />
                    </svg>
                  )}
                  <p className={css.filterElementText}>{key}</p>
                </div>
              </label>
            );
          })}
        </div>

                <div className={css.secondLine}></div> 

          <div className={css.filterElements}>
            {[
              { label: "Van", value: "panelTruck" },
              { label: "Fully Integrated", value: "fullyIntegrated" },
              { label: "Alcove", value: "alcove" },
            ].map((option) => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  name="vehicleType"
                  value={option.value}
                  checked={form === option.value}
                  onChange={(e) => setForm(e.target.value as CamperForm)}
                  className={css.filterElement}
                />
                <div
                  className={css.filterElementBox}
                >
                  {icons[option.value] && (
                    <svg className={css.filterElementIcon}>
                      <use href={`/icons.svg#${icons[option.value]}`} />
                    </svg>
                  )}
                  <p className={css.filterElementText}>{option.label}</p>
                </div>
              </label>
            ))}
          </div>

      </div>

      <button
        onClick={handleApply}
        className={css.filterBtn}
      >
        Apply Filters
      </button>
    </div>
  );
}