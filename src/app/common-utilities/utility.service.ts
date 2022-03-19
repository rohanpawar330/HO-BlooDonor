import { Injectable } from '@angular/core';
import { DONATION_TYPE, gender, totalDayDonation } from './constant';
import { Clipboard } from '@capacitor/clipboard';
import { Storage } from '@capacitor/storage';
import { DataToSaveI } from '../interface/interface';
import moment from 'moment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private loadingController: LoadingController, private alertController: AlertController, private toastCtrl: ToastController) { }

  // chcek donor available for donation
  _availableForDonation(dateOfDonation, userGender, dontationType?) {
    var todayDate = moment().toDate();
    var lastDonationDate = dateOfDonation;
    var dataToSend;
    if (lastDonationDate) {
      var diffInDays = -(moment(lastDonationDate).diff(moment(todayDate, "DD/MM/YYYY"), 'days') + 1)
      switch (dontationType) {
        // **********for blood***************
        case DONATION_TYPE.blood:
          console.log(dontationType, DONATION_TYPE.blood)
          if (userGender == gender.male) {
            dataToSend = diffInDays > totalDayDonation.blood.maleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          } else {
            dataToSend = diffInDays > totalDayDonation.blood.femaleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          }
          break;
        // **********for plasma***************
        case DONATION_TYPE.plasma:
          console.log(dontationType, DONATION_TYPE.plasma)
          if (userGender == gender.male) {
            dataToSend = diffInDays > totalDayDonation.plasma.maleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          } else {
            dataToSend = diffInDays > totalDayDonation.plasma.femaleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          }
          break;
        // **********for platelets***************
        case DONATION_TYPE.platelets:
          console.log(dontationType, DONATION_TYPE.platelets)
          if (userGender == gender.male) {
            dataToSend = diffInDays > totalDayDonation.platelets.maleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          } else {
            dataToSend = diffInDays > totalDayDonation.platelets.femaleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          }
          break;
        default:
          console.log(dontationType, "default")
          if (userGender == gender.male) {
            dataToSend = diffInDays > totalDayDonation.blood.maleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          } else {
            dataToSend = diffInDays > totalDayDonation.blood.femaleDay ? {
              availableForDonation: true,
              daysRemain: diffInDays
            } : {
              availableForDonation: false,
              daysRemain: diffInDays
            }
          }
          break;
      }

      return dataToSend
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
    await loading.present();
  }

  async _hideLoader() {
    this.loadingController.dismiss();
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

  async _confirmationAlert(header, message, subHeader?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      mode: 'ios',
      message: message,
      buttons: ['Ok']
    });

    alert.present();
  }

  async _toastMsg(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present()
  }

  _log(data, msg = 'data logged', type = 'log') {
    if (true)
      console[type](data);
  }
}
