import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import { AdminDetailI } from 'src/app/interface/interface';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { AddAdminUserPage } from '../add-admin-user/add-admin-user.page';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.page.html',
  styleUrls: ['./admin-details.page.scss'],
})
export class AdminDetailsPage implements OnInit {

  adminList: AdminDetailI[] = [];
  rootUser: AdminDetailI;


  constructor(private alertController: AlertController, private menuController: MenuController, private router: Router, private modalCtrl: ModalController, private navCtrl: NavController, private utility: UtilityService, private authService: AuthUserService, private cd: ChangeDetectorRef) {

  }


  ngOnInit() {

    this.utility._getStorage('admin').then((data) => {
      console.log(JSON.parse(data.value))
      let rootUserData = JSON.parse(data.value);
      if (rootUserData && rootUserData.rootUser) {
        this.rootUser = rootUserData;
      }
    });

    this.utility._showLoader();
    this.authService.getAdminList().subscribe((res: any) => {
      this.adminList = res
      console.log(this.adminList)
      this.cd.detectChanges();
      this.utility._hideLoader();
    }, err => {
      this.utility._hideLoader();
      this.utility._errorAlert();
    });
  }


  async OpenaddAdminUserModel() {
    const modal = await this.modalCtrl.create({
      component: AddAdminUserPage,
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      componentProps: {
        'rootUserRec': this.rootUser
      },
    });

    await modal.present();
  }
  close() {
    this.router.navigate(['/home']);
    // this.navCtrl.pop();
  }

  async deleteAdmin(adminDetail) {

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

          }
        }, {
          text: 'Accept',
          id: 'Accept',
          handler: () => {
            this.utility._showLoader();
            this.authService.deleteAdmin(adminDetail).then((res) => {
            })
              .then(() => {
                this.utility._toastMsg(`Deleted ${adminDetail.name} Admin Successfully..`)
                this.utility._hideLoader();
              })
              .catch(() => {
                this.utility._hideLoader();
                this.utility._errorAlert();
              });
          }
        }
      ]
    });

    alert.present();

  }
  onMenuClick() {
    this.menuController.enable(true, 'id')
    this.menuController.open('id')
  }
}
