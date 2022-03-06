import { Injectable } from '@angular/core';
import { gender, totalDayDonation } from './constant';
import { Clipboard } from '@capacitor/clipboard';
import { Storage } from '@capacitor/storage';
import { DataToSaveI } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // chcek donor available for donation
  _availableForDonation(dateOfDonation, userGender) {
    var todayDate = new Date();
    var lastDonationDate = new Date(dateOfDonation);
    var diffInDays = Math.floor((lastDonationDate.getTime() - todayDate.getTime()) / (1000 * 3600 * 24));
    if (userGender == gender.male) {
      return diffInDays > totalDayDonation.maleDay ? {
        availableForDonation: true,
        daysRemain: diffInDays
      } : {
        availableForDonation: false,
        daysRemain: diffInDays
      }
    } else {
      return diffInDays > totalDayDonation.femaleDay ? {
        availableForDonation: true,
        daysRemain: diffInDays
      } : {
        availableForDonation: false,
        daysRemain: diffInDays
      }
    }
  }

  // START Clipboard
  _copyText(textToCopy) {
    Clipboard.write({
      string: textToCopy
    });
  }

  _pasteText(): Promise<any> {
    return Clipboard.read();
  }
  // END Clipboard

  // START Storage
  _setStorage(dataToSave: DataToSaveI) {
    Storage.set({ key: dataToSave.key, value: dataToSave.value });
  }

  _getStorage(dataToGet): Promise<any> {
    return Storage.get({ key: dataToGet })
  }

  _clearStorage() {
    Storage.clear();
  }
  // END Storage

}
