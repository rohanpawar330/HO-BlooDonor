import { Injectable } from '@angular/core';
import { gender, totalDayDonation } from './constant';
import { Clipboard } from '@capacitor/clipboard';
import { Storage } from '@capacitor/storage';
import { DataToSaveI } from '../interface/interface';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // chcek donor available for donation
  _availableForDonation(dateOfDonation, userGender) {
    var todayDate = moment().toDate();
    var lastDonationDate = dateOfDonation;
    // console.log(moment('09/03/2022').isSame(dateOfDonation));
    // console.log('after', moment('09/03/2022').isAfter(dateOfDonation))
    // console.log('before', moment('09/03/2022').isBefore(dateOfDonation))


    // var given = moment(dateOfDonation, "DD/MM/YYYY");
    // var current = moment(todayDate).startOf('day');

    // //Difference in number of days
    // console.log(moment.duration(given.diff(current)).asDays());
    // var a = moment([2007, 0, 29]);
    // var b = moment([2007, 0, 28]);

    // console.log(a.diff(b, 'days'))
    // var endDate = '09/12/2021';
    // var startDate = moment().toDate();
    // const getDaysDiff = (startDate, endDate, date_format = "DD/MM/YYYY") => {
    //   const getDateAsArray = (date) => {
    //     return moment(date, date_format);
    //   }
    //   return;
    // }
    // console.log(moment(lastDonationDate, "DD/MM/YYYY").diff(moment(todayDate, "DD/MM/YYYY"), 'days') + 1);



    var diffInDays = -(moment(lastDonationDate, "DD/MM/YYYY").diff(moment(todayDate, "DD/MM/YYYY"), 'days') + 1);
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
