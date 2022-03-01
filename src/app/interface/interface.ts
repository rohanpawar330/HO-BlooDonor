export interface UserDetailsI {
  id?: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  dateOfDonation: Date;
  bloodGroup: string;
  gender: string;
  age: number;
  availableForDonation: string;
  address: {
    city: string;
    area: string;
    state: string;
    pincode: number;
  }
}