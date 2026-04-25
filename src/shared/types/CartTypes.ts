type PurchaseType = 'RENTA' | 'VENTA';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  type: PurchaseType;
  quantity: number;
  // CASO DE VENTA
  // Si type === 'VENTA'
  salePrice?: number;
  // CASO DE RENTA
  rentalPrice?: number;
  rentalDays?: number;
  photoUrl?: string;
}
