import axios from "axios";
import type {  BookingRequest, CamperDetails, CampersParams, CampersResponse, FiltersResponse,  Review, } from "@/types/camper";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://campers-api.goit.study",
});

export async function fetchCampers(params: CampersParams) {
  const { data } = await api.get<CampersResponse>("/campers", { params });
  return data;
}

export async function fetchFilters() {
  const { data } = await api.get<FiltersResponse>("/campers/filters");
  return data;
}

export async function fetchCamper(id: string) {
  const { data } = await api.get<CamperDetails>(`/campers/${id}`);
  return data;
}

export async function fetchReviews(id: string) {
  const { data } = await api.get<Review[]>(`/campers/${id}/reviews`);
  return data;
}

export async function createBooking(id: string, body: BookingRequest) {
  const { data } = await api.post(`/campers/${id}/booking-requests`, body);
  return data;
}