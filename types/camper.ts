export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  transmission: "manual" | "automatic";
  engine: string;
  form: "alcove" | "panelTruck" | "fullyIntegrated";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  AC: boolean;
  TV: boolean;
  kitchen: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: GalleryItem[];
  reviews: Review[];
};

export interface GalleryItem {
  thumb: string;
  original: string;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}
