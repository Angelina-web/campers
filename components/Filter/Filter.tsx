"use client";

import css from "./Filter.module.css";
import { icons } from "@/app/constants/icons";
import useFilterStore from "@/lib/store/filters";

export default function Filters() {
  const { 
    location,
    setLocation,
    equipment,
    toggleEquipment,
    form,
    setForm,
    transmission,
    setTransmission,
    activeFilters,
    applyFilters
  } = useFilterStore();

  const equipmentOptions = ["AC", "kitchen", "TV", "bathroom"] as const;

  return (
    <div className={css.filterContainer}>
      <div className={css.locationFilter}>
        <label className={css.locationText}>Location</label>
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
        <p className={css.filterText}>Filters</p>
        <p className={css.filterTitle}>Vehicle equipment</p>
        <div className={css.line}></div>

        <div className={css.equipmentContainer}>
          {equipmentOptions.map((key) => {
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
            <label key={option.value}>
              <input
                type="radio"
                name="vehicleType"
                value={option.value}
                checked={form === option.value}     
                onChange={() => setForm(option.value)} 
                className={css.filterElement}
              />
              <div className={css.filterElementBox}>
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

      <button className={css.filterBtn} onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
}
