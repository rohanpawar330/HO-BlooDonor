import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from './common-utilities/utility.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  lastBack;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private utility: UtilityService, private router: Router, private platform: Platform) {
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
}
