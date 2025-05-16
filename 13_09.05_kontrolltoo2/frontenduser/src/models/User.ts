// src/models/User.ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  password?: string;

  addressStreet?: string;
  addressSuite?: string;
  addressCity?: string;
  addressZipcode?: string;
  geoLat?: string;
  geoLng?: string;

  companyName?: string;
  companyCatchPhrase?: string;
  companyBs?: string;
}
