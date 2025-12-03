import axios from "axios";

export type Category = {
  page: number;
  limit: number;
  location?: string;
  form?: string;
  transmission?: string;
  equipment?: string[];
 };

export type CategoryListResponse = {
  notes:Category[];
  total: number;
};

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const getNotes = async () => {
  const res = await axios.get<CategoryListResponse>("/categories");
  return res.data;
};