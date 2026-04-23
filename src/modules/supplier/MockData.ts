import type {
  CountryResponse,
  StateResponse,
  SummaryCard,
  SupplierForm,
  SupplierLightResponse,
} from './types/SupplierTypes';

export const mockSuppliersLight: SupplierLightResponse[] = [
  {
    id: 'e1111111-1111-4111-8111-111111111111',
    name: 'MedSupply MX',
    mobilePhone: '5512345678',
    email: 'contacto@medsupply.com',
    active: true,
  },
  {
    id: 'e2222222-2222-4222-8222-222222222222',
    name: 'NeoTech México',
    mobilePhone: '3312345678',
    email: 'ventas@neotech.com',
    active: true,
  },
  {
    id: 'e3333333-3333-4333-8333-333333333333',
    name: 'RespiraMed',
    mobilePhone: '8112345678',
    email: 'info@respiramed.com',
    active: true,
  },
  {
    id: 'e4444444-4444-4444-8444-444444444444',
    name: 'LabTech Solutions',
    mobilePhone: '2221234567',
    email: 'ventas@labtech.com',
    active: false,
  },
  {
    id: 'e5555555-5555-4555-8555-555555555555',
    name: 'GlobalMed Distribución',
    mobilePhone: '9991234567',
    email: 'contacto@globalmed.com',
    active: true,
  },
];

export const mockSuppliersById: SupplierForm[] = [
  {
    id: 'e1111111-1111-4111-8111-111111111111',
    name: 'MedSupply MX',
    mobilePhone: '5512345678',
    email: 'contacto@medsupply.com',
    active: true,
    rfc: 'MSM010203AB1',
    contactName: 'Carlos Mendoza',
    phoneOffice: '5550001111',
    phoneExt: '101',
    country: 'f1111111-1111-4111-8111-111111111111',
    state: 'f2111111-1111-4111-8111-111111111111',
    zipCode: '01000',
    city: 'Ciudad de México',
    neighborhood: 'Álvaro Obregón',
    address: 'Av. Insurgentes Sur 1234',
  },
  {
    id: 'e2222222-2222-4222-8222-222222222222',
    name: 'NeoTech México',
    mobilePhone: '3312345678',
    email: 'ventas@neotech.com',
    active: true,
    rfc: 'NMX020304CD2',
    contactName: 'Ana López',
    phoneOffice: '3330002222',
    phoneExt: '202',
    country: 'f1111111-1111-4111-8111-111111111111',
    state: 'f2222222-2222-4222-8222-222222222222',
    zipCode: '44100',
    city: 'Guadalajara',
    neighborhood: 'Centro',
    address: 'Calle Juárez 456',
  },
  {
    id: 'e3333333-3333-4333-8333-333333333333',
    name: 'RespiraMed',
    mobilePhone: '8112345678',
    email: 'info@respiramed.com',
    active: true,
    rfc: 'RMD030405EF3',
    contactName: 'Luis Martínez',
    phoneOffice: '8180003333',
    phoneExt: '303',
    country: 'f1111111-1111-4111-8111-111111111111',
    state: 'f2333333-3333-4333-8333-333333333333',
    zipCode: '64000',
    city: 'Monterrey',
    neighborhood: 'Centro',
    address: 'Av. Constitución 789',
  },
  {
    id: 'e4444444-4444-4444-8444-444444444444',
    name: 'LabTech Solutions',
    mobilePhone: '2221234567',
    email: 'ventas@labtech.com',
    active: false,
    rfc: 'LTS040506GH4',
    contactName: 'María González',
    phoneOffice: '2220004444',
    phoneExt: '404',
    country: 'f1111111-1111-4111-8111-111111111111',
    state: 'f2444444-4444-4444-8444-444444444444',
    zipCode: '72000',
    city: 'Puebla',
    neighborhood: 'Centro Histórico',
    address: 'Calle 5 de Mayo 321',
  },
  {
    id: 'e5555555-5555-4555-8555-555555555555',
    name: 'GlobalMed Distribución',
    mobilePhone: '9991234567',
    email: 'contacto@globalmed.com',
    active: true,
    rfc: 'GMD050607IJ5',
    contactName: 'Jorge Hernández',
    phoneOffice: '9990005555',
    phoneExt: '505',
    country: 'f1111111-1111-4111-8111-111111111111',
    state: 'f2555555-5555-4555-8555-555555555555',
    zipCode: '97000',
    city: 'Mérida',
    neighborhood: 'Centro',
    address: 'Av. Paseo de Montejo 100',
  },
];

export const mockCountries: CountryResponse[] = [
  {
    id: 'f1111111-1111-4111-8111-111111111111',
    name: 'México',
  },
  {
    id: 'f1222222-2222-4222-8222-222222222222',
    name: 'Estados Unidos',
  },
  {
    id: 'f1333333-3333-4333-8333-333333333333',
    name: 'España',
  },
];

export const mockStates: StateResponse[] = [
  // 🇲🇽 México
  {
    id: 'f2111111-1111-4111-8111-111111111111',
    countryId: 'f1111111-1111-4111-8111-111111111111',
    name: 'Ciudad de México',
  },
  {
    id: 'f2222222-2222-4222-8222-222222222222',
    countryId: 'f1111111-1111-4111-8111-111111111111',
    name: 'Jalisco',
  },
  {
    id: 'f2333333-3333-4333-8333-333333333333',
    countryId: 'f1111111-1111-4111-8111-111111111111',
    name: 'Nuevo León',
  },
  {
    id: 'f2444444-4444-4444-8444-444444444444',
    countryId: 'f1111111-1111-4111-8111-111111111111',
    name: 'Puebla',
  },
  {
    id: 'f2555555-5555-4555-8555-555555555555',
    countryId: 'f1111111-1111-4111-8111-111111111111',
    name: 'Yucatán',
  },

  // 🇺🇸 Estados Unidos
  {
    id: 'f3111111-1111-4111-8111-111111111111',
    countryId: 'f1222222-2222-4222-8222-222222222222',
    name: 'California',
  },
  {
    id: 'f3222222-2222-4222-8222-222222222222',
    countryId: 'f1222222-2222-4222-8222-222222222222',
    name: 'Texas',
  },
  {
    id: 'f3333333-3333-4333-8333-333333333333',
    countryId: 'f1222222-2222-4222-8222-222222222222',
    name: 'Florida',
  },
  {
    id: 'f3444444-4444-4444-8444-444444444444',
    countryId: 'f1222222-2222-4222-8222-222222222222',
    name: 'New York',
  },
  {
    id: 'f3555555-5555-4555-8555-555555555555',
    countryId: 'f1222222-2222-4222-8222-222222222222',
    name: 'Illinois',
  },

  // 🇪🇸 España
  {
    id: 'f4111111-1111-4111-8111-111111111111',
    countryId: 'f1333333-3333-4333-8333-333333333333',
    name: 'Madrid',
  },
  {
    id: 'f4222222-2222-4222-8222-222222222222',
    countryId: 'f1333333-3333-4333-8333-333333333333',
    name: 'Cataluña',
  },
  {
    id: 'f4333333-3333-4333-8333-333333333333',
    countryId: 'f1333333-3333-4333-8333-333333333333',
    name: 'Andalucía',
  },
  {
    id: 'f4444444-4444-4444-8444-444444444444',
    countryId: 'f1333333-3333-4333-8333-333333333333',
    name: 'Valencia',
  },
  {
    id: 'f4555555-5555-4555-8555-555555555555',
    countryId: 'f1333333-3333-4333-8333-333333333333',
    name: 'Galicia',
  },
];

export const mockSummary: SummaryCard[] = [
  { text: 'supplier.summary.total', number: '6', icon: 'mdi-table-check', color: 'secondary' },
  {
    text: 'supplier.summary.active',
    number: '4',
    icon: 'mdi-check-circle-outline',
    color: 'success',
  },
  {
    text: 'supplier.summary.inactive',
    number: '1',
    icon: 'mdi-close-circle-outline',
    color: 'error',
  },
];
