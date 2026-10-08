export type CenterType =
  | 'csc'
  | 'bdo'
  | 'gram_panchayat'
  | 'anganwadi'
  | 'tehsil_office'
  | 'lead_bank';

export interface HelpCenter {
  id: string;
  name: string;
  nameHindi: string;
  type: CenterType;
  typeLabel: string;
  typeLabelHindi: string;
  state: string;
  district: string;
  subDistrict?: string;
  address: string;
  addressHindi: string;
  phone: string;
  operatingHours: string;
  servicesProvided: string[];
  servicesProvidedHindi: string[];
  contactPerson?: string;
}
