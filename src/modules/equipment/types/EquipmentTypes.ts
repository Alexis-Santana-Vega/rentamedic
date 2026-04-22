export interface CategoryResponse {
  id: string;
  name: string;
}

export interface ProductLightResponse {
  id: string;
  categoryId: string;
  categoryName: string;
  barcode: string;
  name: string;
  description: string;
  stock: number;
  status: string;
}

export interface ProductForm {
  id: string;
  categoryId: string;
  barcode: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  purchasePrice: number;
  rentPrice: number;
  maxStock: number;
  minStock: number;
  type: string[];
  active: boolean;
  suppliers: SupplierProduct[];
}

export interface SupplierLightResponse {
  id: string;
  name: string;
  active: boolean;
  supplierName: string;
  mobilePhone: string;
  email: string;
}

export interface SupplierProduct extends SupplierLightResponse {
  idProduct: string;
}

export interface SummaryCard {
  text: string;
  number: string;
  icon: string;
  color: string;
}
