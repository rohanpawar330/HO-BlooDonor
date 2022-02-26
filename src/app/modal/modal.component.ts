import { Component, Input, OnInit } from '@angular/core';

import { ModalController, ToastController } from '@ionic/angular';
import { DataService, UserDetailsI } from '../data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  userDetail: UserDetailsI = null;

  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe(res => {
      console.log(res)
      this.userDetail = res;
    });
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.userDetail)
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    await this.dataService.updateNote(this.userDetail);
    const toast = await this.toastCtrl.create({
      message: 'User Detail updated!.',
      duration: 2000
    });
    toast.present().then(() => this.modalCtrl.dismiss());

  }
}