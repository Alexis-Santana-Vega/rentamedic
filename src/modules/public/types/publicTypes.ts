export interface SearchLightResponse {
  id: string;
  name: string;
  rentPrice: string;
  sellingPrice: string;
  brand: string;
  photoUrl: string[];
  status: ('RENTA' | 'VENTA')[];
}

export interface SearchResponse extends SearchLightResponse {
  shortDescription: string;
  longDescription: string;
}
