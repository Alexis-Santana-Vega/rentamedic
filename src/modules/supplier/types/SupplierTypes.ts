export interface SummaryCard {
  text: string;
  number: string;
  icon: string;
  color: string;
}

export interface SupplierLightResponse {
  id: string;
  name: string;
  mobilePhone: string;
  email: string;
  active: boolean;
}

export interface SupplierForm extends SupplierLightResponse {
  rfc: string;
  contactName: string;
  phoneOffice: string;
  phoneExt: string;
  country: string;
  state: string;
  zipCode: string;
  city: string;
  neighborhood: string;
  address: string;
}

export interface CountryResponse {
  id: string;
  name: string;
}

export interface StateResponse {
  id: string;
  countryId: string;
  name: string;
}
