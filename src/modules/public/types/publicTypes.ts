export interface SearchLightResponse {
  id: string;
  name: string;
  rentalPrice: number;
  salePrice: number;
  brand: string;
  photoUrl: string[];
  status: ('RENTA' | 'VENTA')[];
}

export interface SearchResponse extends SearchLightResponse {
  shortDescription: string;
  longDescription: string;
}

export interface RentForm {
  productId: string;
  rentalDays: number;
  quantity: number;
}

export interface SaleForm {
  productId: string;
  quantity: number;
}
