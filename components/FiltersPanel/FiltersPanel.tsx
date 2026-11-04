"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { fetchFilters } from "@/lib/api";
import type { CampersFilters } from "@/types/camper";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

type Props = {
  onSearchAction: (filters: CampersFilters) => void;
};

type RadioGroupProps<T extends string> = {
  name: string;
  title: string;
  options: T[];
  getLabel: (option: T) => string;
  value?: T;
  onChange: (value: T) => void;
};

function RadioGroup<T extends string>({
  name,
  title,
  options,
  getLabel,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-normal leading-[150%] text-gray">
        {title}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-base font-normal leading-[150%] text-main"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="size-5 cursor-pointer accent-button"
            />
            {getLabel(option)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function FiltersPanel({ onSearchAction }: Props) {
  const t = useTranslations("Filters");
  const tOptions = useTranslations("Options");

  const [draft, setDraft] = useState<CampersFilters>({});

  const { data } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    staleTime: Infinity,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchAction({ ...draft, location: draft.location?.trim() || undefined });
  };

  const handleClear = () => {
    setDraft({});
    onSearchAction({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[360px] shrink-0 flex-col gap-6 rounded-[20px] bg-inputs p-6"
    >
      <label className="flex flex-col gap-2">
        <span className="text-base font-normal leading-[150%] text-gray">
          {t("location")}
        </span>
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-main">
            <SvgIcon src="/svg/map.svg" width={20} height={20} />
          </span>
          <input
            type="text"
            value={draft.location ?? ""}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder={t("locationPlaceholder")}
            className="h-14 w-full rounded-xl bg-background pl-12 pr-4 text-base text-main outline-none placeholder:text-main focus:ring-1 focus:ring-button"
          />
        </div>
      </label>

      <h2 className="text-xl font-semibold leading-[120%] text-main">{t("title")}</h2>

      {data && (
        <>
          <RadioGroup
            name="form"
            title={t("form")}
            options={data.forms}
            getLabel={(o) => tOptions(`form.${o}`)}
            value={draft.form}
            onChange={(form) => setDraft((prev) => ({ ...prev, form }))}
          />
          <RadioGroup
            name="engine"
            title={t("engine")}
            options={data.engines}
            getLabel={(o) => tOptions(`engine.${o}`)}
            value={draft.engine}
            onChange={(engine) => setDraft((prev) => ({ ...prev, engine }))}
          />
          <RadioGroup
            name="transmission"
            title={t("transmission")}
            options={data.transmissions}
            getLabel={(o) => tOptions(`transmission.${o}`)}
            value={draft.transmission}
            onChange={(transmission) =>
              setDraft((prev) => ({ ...prev, transmission }))
            }
          />
        </>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="h-14 w-full rounded-full bg-button px-[60px] py-4 text-base font-medium leading-[150%] tracking-[-0.01em] text-white transition-colors hover:bg-button-hover"
        >
          {t("search")}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-button bg-background px-8 py-4 text-base font-medium leading-[150%] tracking-[-0.01em] text-main transition-colors hover:border-button-hover"
        >
          <SvgIcon src="/svg/close.svg" width={24} height={24} />
          {t("clear")}
        </button>
      </div>
    </form>
  );
}
