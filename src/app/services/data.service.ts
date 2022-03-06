import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDetailsI } from '../interface/interface';
import { firebaseAPI } from '../common-utilities/api.constant';


// todayDate: any = new Date();
// date = this.todayDate.toISOString();
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore, private afr: AngularFirestore) { }

  getUsersList(): Observable<UserDetailsI[]> {
    const usersRef = collection(this.firestore, firebaseAPI.ALL_DONOR_LIST);
    return collectionData(usersRef, { idField: 'id' }) as Observable<UserDetailsI[]>;
  }

  getUserById(id): Observable<UserDetailsI> {
    const userDocRef = doc(this.firestore, `${firebaseAPI.ALL_DONOR_LIST}/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<UserDetailsI>;
  }

  addUser(user: UserDetailsI) {
    const usersRef = collection(this.firestore, firebaseAPI.ALL_DONOR_LIST);
    return addDoc(usersRef, user);
  }

  deleteUser(user: UserDetailsI) {
    const userDocRef = doc(this.firestore, `${firebaseAPI.ALL_DONOR_LIST}/${user.id}`);
    return deleteDoc(userDocRef);
  }

  updateUserDetail(user: UserDetailsI) {
    const userDocRef = doc(this.firestore, `${firebaseAPI.ALL_DONOR_LIST}/${user.id}`);
    return updateDoc(userDocRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
      age: user.age,
      gender: user.gender,
      dateOfDonation: user.dateOfDonation,
      bloodGroup: user.bloodGroup,
      availableForDonation: user.availableForDonation,
      address: {
        city: user.address.city,
        area: user.address.area,
        state: user.address.state,
        pincode: user.address.pincode,
      }
    });
  }

  // getAvailableDonor() {
  //   //   // const usersRef = collection(this.firestore, firebaseAPI.ALL_DONOR_LIST);
  //   var usersRef = this.afr.collection("${firebaseAPI.ALL_DONOR_LIST}", ref => ref.where('bloodGroup', '==', 'rohan')).valueChanges();
  //   console.log(usersRef)  //  usersRef.valueChanges().subscribe((x)=>console.log(x));
  //   //   // console.log(query(usersRef, where("firstName", "==", 'rohan')));


  // }
  getAvailableDonor() {
    const usersRef = collection(this.firestore, firebaseAPI.AUTH_USER);
    // const usersRef = this.afr.collection("${firebaseAPI.ALL_DONOR_LIST}", ref => ref.where('bloodGroup', '==', 'rohan'));
    // usersRef``
    // usersRef.valueChanges().subscribe((x) => console.log(x));
    console.log(query(usersRef, where("mobileNo", "==", '9090909090')));


  }
}