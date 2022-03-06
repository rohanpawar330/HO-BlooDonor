import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { firebaseAPI } from '../common-utilities/api.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private afr: AngularFirestore) { }

  _authUser(mobileNo): Observable<any> {
    const usersRef = this.afr.collection(firebaseAPI.AUTH_USER, ref => ref.where('mobileNo', '==', mobileNo)).valueChanges();
    return usersRef;
  }

  
}
