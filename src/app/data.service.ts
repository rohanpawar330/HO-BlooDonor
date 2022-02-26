import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface UserDetailsI {
  id?: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  dateOFDonation: string;
  bloodGroup: string;
  availableForDonation: boolean;
  address: {
    city: string;
    area: string;
    state: string;
    pincode: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getNotes(): Observable<UserDetailsI[]> {
    const notesRef = collection(this.firestore, 'all-donor-list');
    return collectionData(notesRef, { idField: 'id' }) as Observable<UserDetailsI[]>;
  }

  getNoteById(id): Observable<UserDetailsI> {
    const noteDocRef = doc(this.firestore, `all-donor-list/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<UserDetailsI>;
  }

  addNote(note: UserDetailsI) {
    const notesRef = collection(this.firestore, 'all-donor-list');
    return addDoc(notesRef, note);
  }

  deleteNote(note: UserDetailsI) {
    const noteDocRef = doc(this.firestore, `all-donor-list/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: UserDetailsI) {
    const noteDocRef = doc(this.firestore, `all-donor-list/${note.id}`);
    return updateDoc(noteDocRef, {
      firstName: note.firstName,
      lastName: note.lastName,
      mobileNo: note.mobileNo,
      dateOFDonation: note.dateOFDonation,
      bloodGroup: note.bloodGroup,
      availableForDonation: note.availableForDonation,
      address: {
        city: note.address.city,
        area: note.address.area,
        state: note.address.state,
        pincode: note.address.pincode,
      }
    });
  }
}