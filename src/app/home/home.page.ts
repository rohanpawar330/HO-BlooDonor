
import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService, UserDetailsI } from '../data.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  userDetails: UserDetailsI[] = [];

  constructor(private dataService: DataService, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res => {
      console.log(res)
      this.userDetails = res;
      this.cd.detectChanges();
    });
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'firstName',
          type: 'text'
        },
        {
          name: 'lastName',
          placeholder: 'lastName',
          type: 'text'
        },
        {
          name: 'mobileNo',
          placeholder: 'mobileNo',
          type: 'text'
        },
        {
          name: 'dateOFDonation',
          placeholder: 'dateOFDonation',
          type: 'text'
        },
        {
          name: 'bloodGroup',
          placeholder: 'bloodGroup',
          type: 'text'
        },
        {
          name: 'availableForDonation',
          placeholder: 'availableForDonation',
          type: 'text'
        },
        {
          name: 'city',
          placeholder: 'city',
          type: 'text'
        },
        {
          name: 'area',
          placeholder: 'area',
          type: 'text'
        },
        {
          name: 'state',
          placeholder: 'state',
          type: 'text'
        },
        {
          name: 'pincode',
          placeholder: 'pincode',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.dataService.addNote({
              firstName: res.firstName,
              lastName: res.lastName,
              mobileNo: res.mobileNo,
              dateOFDonation: res.dateOFDonation,
              bloodGroup: res.bloodGroup,
              availableForDonation: res.availableForDonation,
              address: {
                city: res.city,
                area: res.area,
                state: res.state,
                pincode: res.pincode,
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async openNote(userDetail: UserDetailsI) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { id: userDetail.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }
}