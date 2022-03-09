export interface UserDetailsI {
  id?: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  dateOfDonation: string;
  bloodGroup: string;
  gender: string;
  age: number;
  availableForDonation: boolean;
  address: {
    city: string;
    area: string;
    state: string;
    pincode: number;
  }
}

export interface DataToSaveI {
  key: string;
  value: string;
}

export interface QueryDbI {
  coloumnName: string;
  condition: any;
  attributeName: any;
}