import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDetailsI } from '../interface/interface';
import { firebaseAPI } from '../common-utilities/api.constant';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  constructor(private firestore: Firestore, private afr: AngularFirestore) { }

  getDonorsList(): Observable<UserDetailsI[]> {
    const donorsRef = collection(this.firestore, firebaseAPI.ALL_DONOR_LIST);
    return collectionData(donorsRef, { idField: 'id' }) as Observable<UserDetailsI[]>;
  }

  getDonorById(id): Observable<UserDetailsI> {
    const userDocRef = doc(this.firestore, `${firebaseAPI.ALL_DONOR_LIST}/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<UserDetailsI>;
  }

  addDonor(user: UserDetailsI) {
    const donorsRef = collection(this.firestore, firebaseAPI.ALL_DONOR_LIST);
    return addDoc(donorsRef, user);
  }

  deleteDonor(user: UserDetailsI) {
    const donorDocRef = doc(this.firestore, `${firebaseAPI.ALL_DONOR_LIST}/${user.id}`);
    return deleteDoc(donorDocRef);
  }

  updateDonorDetail(donor: UserDetailsI) {
    const donorDocRef = doc(this.firestore, `${firebaseAPI.ALL_DONOR_LIST}/${donor.id}`);
    return updateDoc(donorDocRef, {
      firstName: donor.firstName,
      lastName: donor.lastName,
      mobileNo: donor.mobileNo,
      age: donor.age,
      gender: donor.gender,
      dateOfDonation: donor.dateOfDonation,
      bloodGroup: donor.bloodGroup,
      donationType: donor.donationType,
      updateDetails: donor.updateDetails,
      availableForDonation: donor.availableForDonation,
      address: {
        city: donor.address.city,
        area: donor.address.area,
        state: donor.address.state,
      }
    });
  }


  getAvailableDonor() {
    const donorsRef = collection(this.firestore, firebaseAPI.AUTH_USER);
    console.log(query(donorsRef, where("mobileNo", "==", '9090909090')));
  }

  getDataWhere(coloumnName: string, condition: any, attributeName: string | number | boolean): Observable<any> {
    const donorsRef = this.afr.collection(firebaseAPI.ALL_DONOR_LIST, ref => ref.where(coloumnName, condition, attributeName)).valueChanges();
    return donorsRef;
  }
}