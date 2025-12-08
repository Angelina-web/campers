import axios from "axios";
import { Camper } from "@/types/camper";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const getCampers = async (
  page: number,
  filters: {
    location: string;
    equipment: string[];
    transmission: string;
    form: string;
  }
) => {
  const params: Record<string, string | number | boolean> = {
    page,
    limit: 4,
  };

  if (filters.location) params.location = filters.location;
  if (filters.transmission) params.transmission = filters.transmission;
  if (filters.form)
    params.form = filters.form.toLowerCase().replace(/\s+/g, "");

  filters.equipment.forEach((eq) => {
    params[eq] = true;
  });

  const { data } = await axios.get<Camper[]>("/campers", { params });
  return data;
};

export const getCamperById = async (id: string) => {
  const { data } = await axios.get<Camper>(`/campers/${id}`);
  return data;
};
