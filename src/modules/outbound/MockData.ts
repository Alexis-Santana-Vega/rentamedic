import type {
  EquipmentScanner,
  LocationLightResponse,
  OutboundForm,
  PurchaserLightResponse,
} from './types/OutboundTypes';

export const mockOutbounds: OutboundForm[] = [
  {
    id: 'o1111111-1111-4111-8111-111111111111',
    folio: 'OUT-0001',
    outboundType: 'SALE',
    datetime: '2026-04-24T14:00:00',
    totalAmount: '15000.00',
    purchaserId: 'u1111111-1111-4111-8111-111111111111',
    note: 'Venta a cliente hospital privado',
    equipment: [
      {
        barcode: 'RM-0090-SV',
        productId: 'c9999999-9999-4999-8999-999999999999',
        name: 'OxyFlow 500',
        quantity: 1,
        codeValid: true,
      },
    ],
  },

  {
    id: 'o2222222-2222-4222-8222-222222222222',
    folio: 'OUT-0002',
    outboundType: 'TRANSFER',
    datetime: '2026-04-24T16:00:00',
    totalAmount: '0.00',
    purchaserId: 'u2222222-2222-4222-8222-222222222222',
    destinationLocationId: 'a3333333-3333-4333-8333-333333333333',
    note: 'Transferencia a sucursal Monterrey',
    equipment: [
      {
        barcode: 'RM-0040-SV',
        productId: 'c4444444-4444-4444-8444-444444444444',
        name: 'NebulaCare Mini',
        quantity: 2,
        codeValid: true,
      },
    ],
  },

  {
    id: 'o3333333-3333-4333-8333-333333333333',
    folio: 'OUT-0003',
    outboundType: 'SALE',
    datetime: '2026-04-23T13:30:00',
    totalAmount: '32000.00',
    purchaserId: 'u3333333-3333-4333-8333-333333333333',
    equipment: [
      {
        barcode: 'RM-0100-SV',
        productId: 'caaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        name: 'LabAnalyzer Smart',
        quantity: 1,
        codeValid: true,
      },
    ],
  },

  {
    id: 'o4444444-4444-4444-8444-444444444444',
    folio: 'OUT-0004',
    outboundType: 'SALE',
    datetime: '2026-04-22T11:00:00',
    totalAmount: '8000.00',
    purchaserId: 'u4444444-4444-4444-8444-444444444444',
    equipment: [
      {
        barcode: 'RM-0050-SV',
        productId: 'c5555555-5555-4555-8555-555555555555',
        name: 'SuctionMed V2',
        quantity: 1,
        codeValid: true,
      },
    ],
  },

  {
    id: 'o5555555-5555-4555-8555-555555555555',
    folio: 'OUT-0005',
    outboundType: 'TRANSFER',
    datetime: '2026-04-21T17:45:00',
    totalAmount: '0.00',
    purchaserId: 'u5555555-5555-4555-8555-555555555555',
    destinationLocationId: 'a2222222-2222-4222-8222-222222222222',
    equipment: [
      {
        barcode: 'RM-0020-SV',
        productId: 'c2222222-2222-4222-8222-222222222222',
        name: 'PhotoCare LED',
        quantity: 2,
        codeValid: true,
      },
    ],
  },
];

export const mockLocationsLight: LocationLightResponse[] = [
  {
    id: 'a1111111-1111-4111-8111-111111111111',
    name: 'Ciudad de México',
  },
  {
    id: 'a2222222-2222-4222-8222-222222222222',
    name: 'Guadalajara',
  },
  {
    id: 'a3333333-3333-4333-8333-333333333333',
    name: 'Monterrey',
  },
  {
    id: 'a4444444-4444-4444-8444-444444444444',
    name: 'Puebla',
  },
  {
    id: 'a5555555-5555-4555-8555-555555555555',
    name: 'Mérida',
  },
];

export const mockEquipmentProducts: EquipmentScanner[] = [
  {
    barcode: 'RM-0010-SV',
    productId: 'c1111111-1111-4111-8111-111111111111',
    name: 'Centrimax 12K',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0020-SV',
    productId: 'c2222222-2222-4222-8222-222222222222',
    name: 'PhotoCare LED',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0030-SV',
    productId: 'c3333333-3333-4333-8333-333333333333',
    name: 'AutoPipette X3',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0040-SV',
    productId: 'c4444444-4444-4444-8444-444444444444',
    name: 'NebulaCare Mini',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0050-SV',
    productId: 'c5555555-5555-4555-8555-555555555555',
    name: 'SuctionMed V2',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0060-SV',
    productId: 'c6666666-6666-4666-8666-666666666666',
    name: 'NeoMonitor V3',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0070-SV',
    productId: 'c7777777-7777-4777-8777-777777777777',
    name: 'MicroSpin Pro 3000',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0080-SV',
    productId: 'c8888888-8888-4888-8888-888888888888',
    name: 'NeoWarm Incubator X1',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0090-SV',
    productId: 'c9999999-9999-4999-8999-999999999999',
    name: 'OxyFlow 500',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0100-SV',
    productId: 'caaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    name: 'LabAnalyzer Smart',
    quantity: 0,
    codeValid: true,
  },
  {
    barcode: 'RM-0110-SV',
    productId: 'cbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    name: 'NeoPulse Monitor 2.0',
    quantity: 0,
    codeValid: true,
  },
];

export const mockPurchasersLight: PurchaserLightResponse[] = [
  {
    id: 'u1111111-1111-4111-8111-111111111111',
    name: 'Hospital Ángeles CDMX',
  },
  {
    id: 'u2222222-2222-4222-8222-222222222222',
    name: 'Clínica San José Guadalajara',
  },
  {
    id: 'u3333333-3333-4333-8333-333333333333',
    name: 'Hospital Universitario Monterrey',
  },
  {
    id: 'u4444444-4444-4444-8444-444444444444',
    name: 'Centro Médico Puebla',
  },
  {
    id: 'u5555555-5555-4555-8555-555555555555',
    name: 'Hospital Regional Mérida',
  },
];
