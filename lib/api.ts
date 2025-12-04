import axios from "axios";
import { Camper } from "@/types/camper";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const getCampers = async () => {
  const { data } = await axios.get<Camper[]>("/campers");
  return data;
};

export const getCamperById = async (id: string) => {
  const { data } = await axios.get<Camper>(`/campers/${id}`);
  return data;
};
