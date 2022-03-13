export interface UserDetailsI {
  id?: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  dateOfDonation: string;
  bloodGroup: string;
  donationType: string;
  gender: string;
  age: number;
  updateDetails?: {
    adminName: string;
    mobileNo: number;
    onDate: string;
  };
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
  value: object;
}

export interface QueryDbI {
  coloumnName: string;
  condition: any;
  attributeName: any;
}

export interface AdminI {
  name: string;
  mobileNo: number;
}