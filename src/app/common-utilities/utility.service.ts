import { Injectable } from '@angular/core';
import { gender, totalDayDonation } from './constant';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

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
}
