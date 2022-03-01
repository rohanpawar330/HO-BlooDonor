
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, IonRouterOutlet, ModalController, PopoverController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { UpdateDeleteModal } from '../../modals/update-delete-modal/update-delete-modal.component';
import { format, parseISO } from 'date-fns';
import { Router } from '@angular/router';
import { UserDetailsI } from '../../interface/interface';
import { AddDonorModal } from '../../modals/add-donor-modal/add-donor-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  userDetails: UserDetailsI[] = [];
  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;
  @ViewChild('datePopOver', { static: false }) datePopOver: PopoverController;
  todayDate: any = new Date();
  date = this.todayDate.toISOString();
  fromModalData: string;

  constructor(private router: Router, private dataService: DataService, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController, private datepipe: DatePipe, private routerOutLet: IonRouterOutlet) {
    this.dataService.getUsersList().subscribe(res => {
      console.log(res)
      this.userDetails = res;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    console.log(this.todayDate);
  }

  async addDonar() {
    const modal = await this.modalCtrl.create({
      component: AddDonorModal,
      // componentProps: {
      //   'name': 'TechAssembler',
      //   'type': 'Subscribe'
      // },
      // cssClass: 'my-modal-componet-css',
      // swipeToClose: true,
      // presentingElement: this.routerOutLet.nativeEl

    });

    // modal.onWillDismiss().then((data: any) => {
    //   if (data.data)
    //     this.fromModalData = data.data.fromModal
    //   console.log(data)
    // });
    // modal.onDidDismiss().then((data: any) => {
    //   if (data.data)
    //     this.fromModalData = data.data.fromModal
    //   console.log(data)
    // });
    return await modal.present();


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

  onClick() {
    console.log(this.dataService.getAvailableDonor());
  }
}