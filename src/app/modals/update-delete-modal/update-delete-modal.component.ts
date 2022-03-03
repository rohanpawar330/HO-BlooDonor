import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { IonDatetime, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { UserDetailsI } from '../../interface/interface';

@Component({
  selector: 'app-update-delete-modal',
  templateUrl: './update-delete-modal.component.html',
  styleUrls: ['./update-delete-modal.component.scss'],
})
export class UpdateDeleteModal implements OnInit {
  @Input() id: string;
  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;
  @ViewChild('datePopOver', { static: false }) datePopOver: PopoverController;
 

  userDetail: UserDetailsI = null;

  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.dataService.getUserById(this.id).subscribe(res => {
      console.log(res)
      this.userDetail = res;
    });
  }

  async deleteNote() {
    await this.dataService.deleteUser(this.userDetail)
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    await this.dataService.updateUserDetail(this.userDetail);
    const toast = await this.toastCtrl.create({
      message: 'User Detail updated!.',
      duration: 2000
    });
    toast.present().then(() => this.modalCtrl.dismiss());

  }


  ionDateChange(event) {
    console.log(new Date(event.detail.value));
  }

  closeDatePicker() {
    this.datePopOver.dismiss();
  }
}