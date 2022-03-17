import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firebaseAPI } from '../common-utilities/api.constant';
import { AdminDetailI } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private afr: AngularFirestore, private firestore: Firestore) { }

  _authUser(mobileNo): Observable<any> {
    const usersRef = this.afr.collection(firebaseAPI.AUTH_USER, ref => ref.where('mobileNo', '==', mobileNo)).valueChanges();
    return usersRef;
  }


  addAdmin(user: AdminDetailI) {
    console.log("details", user);
    const usersRef = collection(this.firestore, firebaseAPI.AUTH_USER);
    console.log("userRef", usersRef);

    return addDoc(usersRef, user);

  }

  deleteAdmin(user: AdminDetailI) {
    const adminDocRef = doc(this.firestore, `${firebaseAPI.AUTH_USER}/${user.id}`);
    return deleteDoc(adminDocRef);
  }

  getAdminList(): Observable<AdminDetailI[]> {
    const usersRef = collection(this.firestore, firebaseAPI.AUTH_USER);
    return collectionData(usersRef, { idField: 'id' }) as Observable<AdminDetailI[]>;
  }

}
