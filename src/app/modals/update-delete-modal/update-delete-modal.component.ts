import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AlertController, IonDatetime, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { DonorService } from '../../services/donor.service';
import { UserDetailsI } from '../../interface/interface';
import moment from 'moment';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-delete-modal',
  templateUrl: './update-delete-modal.component.html',
  styleUrls: ['./update-delete-modal.component.scss'],
})
export class UpdateDeleteModal implements OnInit {
  @Input() id: string;
  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;
  @ViewChild('datePopOver', { static: false }) datePopOver: PopoverController;
  editable: boolean = true;

  userDetail: UserDetailsI = null;
  getDonorDetail$: any;
  constructor(private alertController: AlertController, private utility: UtilityService, private donorService: DonorService, private modalCtrl: ModalController, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.utility._showLoader()
    this.getDonorDetail$ = this.donorService.getDonorById(this.id).subscribe((res: any) => {
      if (res.dateOfDonation)
        res.dateOfDonation = moment.parseZone(res.dateOfDonation).utc().format();
      else
        res.dateOfDonation = moment().utc().format();
      this.userDetail = res
      console.log(this.userDetail)
      this.utility._hideLoader();
    });


  }

  async deleteNote() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete!',
      subHeader: 'Are you sure you want to Delete',
      mode: 'ios',
      message: 'Deleted Permanentaly',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            this.dismissModal();
          }
        }, {
          text: 'Accept',
          id: 'Accept',
          handler: () => {
            this.utility._showLoader();
            this.donorService.deleteDonor(this.userDetail)
              .then(() => { this.utility._hideLoader() })
              .catch(() => {
                this.utility._hideLoader();
                this.utility._errorAlert();
              });
            this.dismissModal();
          }
        }
      ]
    });

    alert.present();

    // this.utility._showLoader();
    // await this.donorService.deleteDonor(this.userDetail)
    //   .then(() => { this.utility._hideLoader() })
    //   .catch(() => {
    //     this.utility._hideLoader();
    //     this.utility._errorAlert();
    //   });
    // this.dismissModal();
  }

  async updateNote() {
    let adminDetails;
    await this.utility._getStorage('admin').then(adminData => {
      adminDetails = JSON.parse(adminData.value);
    })
    adminDetails.onDate = moment().format("DD/MM/YYYY");
    this.userDetail.availableForDonation = this.utility._availableForDonation(this.userDetail.dateOfDonation, this.userDetail.gender, this.userDetail.donationType).availableForDonation;
    console.log(adminDetails);
    this.userDetail.updateDetails = adminDetails
    this.utility._showLoader();
    await this.donorService.updateDonorDetail(this.userDetail).then(() => { this.utility._hideLoader() })
      .catch(() => {
        this.utility._hideLoader();
        this.utility._errorAlert();
      });
    this.utility._hideLoader();

    const toast = await this.toastCtrl.create({
      message: 'User Detail updated!',
      duration: 2000
    });
    toast.present().then(() => this.dismissModal());

  }

  dismissModal() {
    this.modalCtrl.dismiss()
  }

  ionDateChange(event) {
    //  this.closeDatePicker();
  }

  closeDatePicker() {
    this.datePopOver.dismiss();
  }

  async _copyUserDetails() {
    this.utility._copyUserDetail(this.userDetail);
    const toast = await this.toastCtrl.create({
      message: 'Copied User Details to Clipboard!',
      duration: 2000
    });
    toast.present()
  }

  _bloodGroupSelected(bloodGroup) {
    this.userDetail.bloodGroup = bloodGroup;
  }
  _donationType(donationType) {
    this.userDetail.donationType = donationType
  }
  _pasteInfo() {
    this.utility._pasteUserDetail().then(data => console.log(data.value))
  }
  _enableEdit() {
    this.editable = !this.editable
    console.log(this.editable)
  }


}