import { Component } from '@angular/core';
import { UtilityService } from './common-utilities/utility.service';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Add Admin', url: '/admin-details', icon: 'person' },
    { title: 'LogOut', url: '/phone-auth', icon: 'log-out' },
  ];
  private loading;
  private lastBack;
  constructor(private platform: Platform, private router: Router, private utility: UtilityService, private loadingController: LoadingController, private menuController: MenuController) {

    // this.checkLogin();
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this does work
      this.platform.backButton.subscribeWithPriority(9999, () => {
        if (Date.now() - this.lastBack < 500) { // logic for double tap: delay of 500ms between two clicks of back button
          navigator['app'].exitApp();
        }
        this.lastBack = Date.now();
      });
    });
  }

  checkLogin() {
    this.utility._getStorage('admin').then(data => {
      if (data.value) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/');
      }
    }).catch(err => {
      this.router.navigateByUrl('/');

    })
  }
  onMenuClick(menuDetails) {
    if (menuDetails.title == 'LogOut') {
      this.logout();
    }
    // console.log("menuDetails",menuDetails);
    this.router.navigate(['/' + menuDetails.url])
  }
  logout() {
    this.loadingController.create({
      message: 'Please wait'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present()
    })
    setTimeout(() => {
      this.loading.dismiss();
      this.menuController.close();
      this.utility._clearStorage()
    }, 2000);

  }


}
