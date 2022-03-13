import { Injectable } from '@angular/core';
import { gender, totalDayDonation } from './constant';
import { Clipboard } from '@capacitor/clipboard';
import { Storage } from '@capacitor/storage';
import { DataToSaveI } from '../interface/interface';
import moment from 'moment';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private loadingController: LoadingController, private alertController: AlertController) { }

  // chcek donor available for donation
  _availableForDonation(dateOfDonation, userGender) {
    var todayDate = moment().toDate();
    var lastDonationDate = dateOfDonation;
    if (lastDonationDate) {

      var diffInDays = -(moment(lastDonationDate).diff(moment(todayDate, "DD/MM/YYYY"), 'days') + 1)
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
    return {
      availableForDonation: true,
      daysRemain: diffInDays

    }
  }

  // START Clipboard
  _copyUserDetail(userDetail) {
    Clipboard.write({
      string: `
      Name : ${userDetail.firstName} ${userDetail.lastName}
      Mobile no. : ${userDetail.mobileNo}
      BloodGroup : ${userDetail.bloodGroup}
      Address : ${userDetail.address.area} ${userDetail.address.city} ${userDetail.address.state}
    `
    });
  }

  _pasteUserDetail(): Promise<any> {
    return Clipboard.read();
  }
  // END Clipboard

  // START Storage
  _setStorage(dataToSave: DataToSaveI) {
    Storage.set({ key: dataToSave.key, value: JSON.stringify(dataToSave.value) });
  }

  _getStorage(dataToGet): Promise<any> {
    return Storage.get({ key: dataToGet })
  }

  _clearStorage() {
    Storage.clear();
  }
  // END Storage

  async _showLoader() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    // await loading.present();
  }

  async _hideLoader() {
    // this.loadingController.dismiss();
  }


  async _errorAlert(subHeader = 'Try again later', message = 'Something went wrong with server!...') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      subHeader: subHeader,
      mode: 'ios',
      message: message,
      buttons: ['OK']
    });

    alert.present();
  }

  async _confirmationAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      mode: 'ios',
      message: message,
      buttons: ['Cancel', 'Accept']
    });

    alert.present();
  }
}
