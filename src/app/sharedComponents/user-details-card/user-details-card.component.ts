import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserDetailsI } from 'src/app/interface/interface';
import { UpdateDeleteModal } from 'src/app/modals/update-delete-modal/update-delete-modal.component';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent implements OnInit {

  @Input() donorInfo: any;
  @Output() reload = new EventEmitter<boolean>();
  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  async openDonar(donorInfo: UserDetailsI) {
    const modal = await this.modalCtrl.create({
      component: UpdateDeleteModal,
      componentProps: { id: donorInfo.id },
    });

    await modal.present();

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        console.log(modelData)
        this.reload.emit(modelData.data.reload);
      }
    });
  }
}
