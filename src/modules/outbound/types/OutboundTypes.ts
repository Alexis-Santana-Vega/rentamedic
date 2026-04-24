export interface EquipmentScanner {
  barcode: string;
  productId: string;
  name: string;
  quantity: number;
  codeValid: boolean;
}

export interface OutboundLightResponse {
  id: string;
  folio: string;
  outboundType: 'TRANSFER' | 'SALE';
  datetime: string;
  totalAmount: string;
}

export interface OutboundForm extends OutboundLightResponse {
  destinationLocationId?: string;
  purchaserId?: string;
  note?: string;
  equipment: EquipmentScanner[];
}

export interface PurchaserLightResponse {
  id: string;
  name: string;
}

export interface LocationLightResponse {
  id: string;
  name: string;
}
