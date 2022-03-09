import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserDetailsI } from 'src/app/interface/interface';
import { UpdateDeleteModal } from 'src/app/modals/update-delete-modal/update-delete-modal.component';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent implements OnInit {

  @Input() userInfo: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // console.log("data",this.userData[0].firstName);

  }

  async openDonar(userDetail: UserDetailsI) {
    const modal = await this.modalCtrl.create({
      component: UpdateDeleteModal,
      componentProps: { id: userDetail.id },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }
}
